#!/usr/bin/env python

import sys
import itertools
from collections import defaultdict
import json
import plugin_pb2 as plugin

from google.protobuf.descriptor_pb2 import DescriptorProto, EnumDescriptorProto

def parse_comments(raw):
    # Drop empty lines at the beginning and end
    raw = raw.strip()
    out = []
    required = False
    output_only = False
    content = False
    for c in raw.splitlines():
        # Trim the leading space that people put after the "//"
        if len(c) > 0 and c[0] == " ":
            c = c[1:]
        # Drop the "REQUIRED", "OUTPUT ONLY" and "OPTIONAL" lines
        if c.strip().lower() == "required":
            required = True
            continue
        if c.strip().lower() == "output only":
            output_only = True
            continue
        if c.strip().lower() == "optional":
            continue
        # SKip blank lines at the start
        if not content and c.strip() == "":
            continue
        content = True
        out.append(c)
    return out, required, output_only
        

def gen_json():
    #output.append({
        #'source': proto_file.source_code_info,
    #})

    # Parse request
    for item, package in traverse(proto_file):
        data = {
            'package': proto_file.package or '&lt;root&gt;',
            'filename': proto_file.name,
            'name': getattr(item, "name", "DUNNO"),
            'pytype': str(type(item)),
        }

        if isinstance(item, DescriptorProto):
            data.update({
                'type': 'Message',
                'properties': [{'name': f.name, 'type': int(f.type)}
                               for f in item.field]
            })

        elif isinstance(item, EnumDescriptorProto):
            data.update({
                'type': 'Enum',
                'values': [{'name': v.name, 'value': v.number}
                           for v in item.value]
            })

        output.append(data)

def build_table(fields):
    rows = []
    headers = ["Field", "Description", "Required", "Output Only"]
    rows.append(headers)
    rows.append(['---'] * len(headers))
    for field, c in fields:
        comments, required, output_only = c
        required = "Yes" if required else "No"
        output_only = "Yes" if output_only else "No"
        rows.append([field.name, "<br>".join(comments), required, output_only])
    return rows

def bookend_join(items, joiner, first=None, last=None):
    if first is None:
        first = joiner
    if last is None:
        last = joiner
    return first + joiner.join(items) + last

def format_output(messages):
    output = ""
    for name, fields in messages.items():
        header = "### " + name + "\n" * 2
        rows = build_table(fields)
        rows = [bookend_join(row, "|") for row in rows]
        table = "\n".join(rows)
        output += header + table + "\n" * 2
    return output

def generate_code(request, response):
    messages = defaultdict(list)

    for proto_file in request.proto_file:
        if proto_file.name != "task_execution.proto":
            continue

        for l in proto_file.source_code_info.location:
            if len(l.path) != 4:
                continue

            a, b, c, d = l.path
            if a == 4:
                m = proto_file.message_type[b]
                if c == 2:
                    f = m.field[d]
                    c = parse_comments(l.leading_comments)
                    messages[m.name].append((f, c))
                    
    # Fill response
    f = response.file.add()
    f.name = proto_file.name + '.md'
    f.content = format_output(messages)


def traverse(proto_file):

    def _traverse(package, items):
        for item in items:
            yield item, package

            if isinstance(item, DescriptorProto):
                for enum in item.enum_type:
                    yield enum, package

                for nested in item.nested_type:
                    nested_package = package + item.name

                    for nested_item in _traverse(nested, nested_package):
                        yield nested_item, nested_package

    return itertools.chain(
        _traverse(proto_file.package, proto_file.enum_type),
        _traverse(proto_file.package, proto_file.message_type),
    )

if __name__ == '__main__':
    # Read request message from stdin
    data = sys.stdin.read()

    # Parse request
    request = plugin.CodeGeneratorRequest()
    request.ParseFromString(data)

    # Create response
    response = plugin.CodeGeneratorResponse()

    # Generate code
    generate_code(request, response)

    # Serialise response message
    output = response.SerializeToString()

    # Write to stdout
    sys.stdout.write(output)
