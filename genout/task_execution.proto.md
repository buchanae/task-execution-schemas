### Task

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier assigned by the server.||Output only|
|state|||Output only|
|name||||
|project|Describes the project this task is associated with.<br>Commonly used for billing on cloud providers (AWS, Google Cloud, etc).|||
|description||||
|inputs|Input files.<br>Inputs will be downloaded and mounted into the executor container.|||
|outputs|Output files.<br>Outputs will be uploaded from the executor container to long-term storage.|||
|resources|Request that the task be run with these resources.|||
|executors|A list of executors to be run, sequentially.|Required||
|volumes|Declared volumes.<br>Volumes are shared between executors. Volumes for inputs and outputs are <br>inferred and should not be delcared here.|||
|tags|A key-value map of arbitrary tags.|||
|logs|Task logging information.<br>Normally, this will contain only one entry, but in the case where<br>a task fails and is retried, an entry will be appended to this list.||Output only|

### ServiceInfo

|Field|Description|Required|Output Only|
|---|---|---|---|
|name|Returns the name of the service, e.g. "ohsu-compbio-funnel".|||
|doc|Returns a documentation string, e.g. "Hey, we're OHSU Comp. Bio!".|||
|storage|Lists some, but not necessarily all, storage locations supported by the service.<br><br>Must be in a valid URL format.<br>e.g. <br>file:///path/to/local/funnel-storage<br>s3://ohsu-compbio-funnel/storage<br>etc.|||

### TaskLog

|Field|Description|Required|Output Only|
|---|---|---|---|
|logs|Logs for each executor|Required||
|metadata|Arbitrary logging metadata included by the implementation.|||
|start_time|When the task started, in RFC 3339 format.|||
|end_time|When the task ended, in RFC 3339 format.|||
|outputs|Information about all output files. Directory outputs are<br>flattened into separate items.|Required||

### TaskParameter

|Field|Description|Required|Output Only|
|---|---|---|---|
|name||||
|description||||
|url|URL in long term storage, for example:<br>s3://my-object-store/file1<br>gs://my-bucket/file2<br>file:///path/to/my/file<br>/path/to/my/file<br>etc...|Required||
|path|Path of the file inside the container.|Required||
|type|Type of the file, FILE or DIRECTORY|Required||
|contents|File contents literal. <br>Implementations should support a minimum of 128 KiB in this field and may define its own maximum.<br>UTF-8 encoded|||

### ListTasksResponse

|Field|Description|Required|Output Only|
|---|---|---|---|
|tasks|List of lightweight task descriptions.|Required||
|next_page_token|Token used to return the next page of results.<br>See TaskListRequest.next_page_token|||

### ListTasksRequest

|Field|Description|Required|Output Only|
|---|---|---|---|
|project|Filter the task list to include tasks in this project.|||
|name_prefix|Filter the list to include tasks where the name matches this prefix.<br>If unspecified, no task name filtering is done.|||
|page_size|Number of tasks to return in one page.<br>Must be less than 2048. Defaults to 256.|||
|page_token|Page token is used to retrieve the next page of results.<br>If unspecified, returns the first page of results.<br>See ListTasksResponse.next_page_token|||
|view|Affects the fields included in the returned Task messages.<br>See TaskView below.|||

### OutputFileLog

|Field|Description|Required|Output Only|
|---|---|---|---|
|url|URL of the file in storage, e.g. s3://bucket/file.txt|Required||
|path|Path of the file inside the container.|Required||
|size_bytes|Size of the file in bytes.|Required||

### Executor

|Field|Description|Required|Output Only|
|---|---|---|---|
|image_name|Name of the container image, for example:<br>ubuntu<br>quay.io/aptible/ubuntu<br>gcr.io/my-org/my-image<br>etc...|Required||
|cmd|The command to be executed.|Required||
|workdir|The working directory that the command will be executed in.<br>Defaults to the directory set by the container image.|||
|stdin|Path inside the container to a file which will be piped<br>to the command's stdin.|||
|stdout|Path inside the container to a file where the command's<br>stdout will be written to.|||
|stderr|Path inside the container to a file where the command's<br>stderr will be written to.|||
|ports|Port to expose from within the container, blank if none.|||
|environ|Enviromental variables to set within the container.|||

### ExecutorLog

|Field|Description|Required|Output Only|
|---|---|---|---|
|start_time|Time the executor started, in RFC 3339 format.|||
|end_time|Time the executor ended, in RFC 3339 format.|||
|stdout|Stdout tail.<br>This is not guaranteed to be the entire log.<br>Implementations determine the maximum size.|||
|stderr|Stderr tail.<br>This is not guaranteed to be the entire log.<br>Implementations determine the maximum size.|||
|exit_code|Exit code.|Required||
|host_ip|IP address of host.|||
|ports|Ports mapped between the container and host.|||

### GetTaskRequest

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier.|Required||
|view|Affects the fields included in the returned Task messages.<br>See TaskView below.|||

### CancelTaskRequest

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier.|Required||

### CreateTaskResponse

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier assigned by the server.|Required||

### Ports

|Field|Description|Required|Output Only|
|---|---|---|---|
|container|Port number opened inside the container.|Required||
|host|Port number opened on the host. Must be greater than 1024.<br>Defaults to 0, which assigns a random port on the host.|||

### Resources

|Field|Description|Required|Output Only|
|---|---|---|---|
|cpu_cores|Requested number of CPUs|||
|preemptible|Is the task allowed to run on preemptible compute instances (e.g. AWS Spot)?|||
|ram_gb|Requested RAM required in gigabytes (GB)|||
|size_gb|Requested disk size in gigabytes (GB)|||
|zones|Request that the task be run in these compute zones.|||

