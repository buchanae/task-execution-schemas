### Task

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier assigned by the server.|No|Yes|
|state||No|Yes|
|name||No|No|
|project|Describes the project this task is associated with.<br>Commonly used for billing on cloud providers (AWS, Google Cloud, etc).|No|No|
|description||No|No|
|inputs|Input files.<br>Inputs will be downloaded and mounted into the executor container.|No|No|
|outputs|Output files.<br>Outputs will be uploaded from the executor container to long-term storage.|No|No|
|resources|Request that the task be run with these resources.|No|No|
|executors|A list of executors to be run, sequentially.|Yes|No|
|volumes|Declared volumes.<br>Volumes are shared between executors. Volumes for inputs and outputs are <br>inferred and should not be delcared here.|No|No|
|tags|A key-value map of arbitrary tags.|No|No|
|logs|Task logging information.<br>Normally, this will contain only one entry, but in the case where<br>a task fails and is retried, an entry will be appended to this list.|No|Yes|

### ServiceInfo

|Field|Description|Required|Output Only|
|---|---|---|---|
|name|Returns the name of the service, e.g. "ohsu-compbio-funnel".|No|No|
|doc|Returns a documentation string, e.g. "Hey, we're OHSU Comp. Bio!".|No|No|
|storage|Lists some, but not necessarily all, storage locations supported by the service.<br><br>Must be in a valid URL format.<br>e.g. <br>file:///path/to/local/funnel-storage<br>s3://ohsu-compbio-funnel/storage<br>etc.|No|No|

### TaskLog

|Field|Description|Required|Output Only|
|---|---|---|---|
|logs|Logs for each executor|Yes|No|
|metadata|Arbitrary logging metadata included by the implementation.|No|No|
|start_time|When the task started, in RFC 3339 format.|No|No|
|end_time|When the task ended, in RFC 3339 format.|No|No|
|outputs|Information about all output files. Directory outputs are<br>flattened into separate items.|Yes|No|

### TaskParameter

|Field|Description|Required|Output Only|
|---|---|---|---|
|name||No|No|
|description||No|No|
|url|URL in long term storage, for example:<br>s3://my-object-store/file1<br>gs://my-bucket/file2<br>file:///path/to/my/file<br>/path/to/my/file<br>etc...|Yes|No|
|path|Path of the file inside the container.|Yes|No|
|type|Type of the file, FILE or DIRECTORY|Yes|No|
|contents|File contents literal. <br>Implementations should support a minimum of 128 KiB in this field and may define its own maximum.<br>UTF-8 encoded|No|No|

### ListTasksResponse

|Field|Description|Required|Output Only|
|---|---|---|---|
|tasks|List of lightweight task descriptions.|Yes|No|
|next_page_token|Token used to return the next page of results.<br>See TaskListRequest.next_page_token|No|No|

### ListTasksRequest

|Field|Description|Required|Output Only|
|---|---|---|---|
|project|Filter the task list to include tasks in this project.|No|No|
|name_prefix|Filter the list to include tasks where the name matches this prefix.<br>If unspecified, no task name filtering is done.|No|No|
|page_size|Number of tasks to return in one page.<br>Must be less than 2048. Defaults to 256.|No|No|
|page_token|Page token is used to retrieve the next page of results.<br>If unspecified, returns the first page of results.<br>See ListTasksResponse.next_page_token|No|No|
|view|Affects the fields included in the returned Task messages.<br>See TaskView below.|No|No|

### OutputFileLog

|Field|Description|Required|Output Only|
|---|---|---|---|
|url|URL of the file in storage, e.g. s3://bucket/file.txt|Yes|No|
|path|Path of the file inside the container.|Yes|No|
|size_bytes|Size of the file in bytes.|Yes|No|

### Executor

|Field|Description|Required|Output Only|
|---|---|---|---|
|image_name|Name of the container image, for example:<br>ubuntu<br>quay.io/aptible/ubuntu<br>gcr.io/my-org/my-image<br>etc...|Yes|No|
|cmd|The command to be executed.|Yes|No|
|workdir|The working directory that the command will be executed in.<br>Defaults to the directory set by the container image.|No|No|
|stdin|Path inside the container to a file which will be piped<br>to the command's stdin.|No|No|
|stdout|Path inside the container to a file where the command's<br>stdout will be written to.|No|No|
|stderr|Path inside the container to a file where the command's<br>stderr will be written to.|No|No|
|ports|Port to expose from within the container, blank if none.|No|No|
|environ|Enviromental variables to set within the container.|No|No|

### ExecutorLog

|Field|Description|Required|Output Only|
|---|---|---|---|
|start_time|Time the executor started, in RFC 3339 format.|No|No|
|end_time|Time the executor ended, in RFC 3339 format.|No|No|
|stdout|Stdout tail.<br>This is not guaranteed to be the entire log.<br>Implementations determine the maximum size.|No|No|
|stderr|Stderr tail.<br>This is not guaranteed to be the entire log.<br>Implementations determine the maximum size.|No|No|
|exit_code|Exit code.|Yes|No|
|host_ip|IP address of host.|No|No|
|ports|Ports mapped between the container and host.|No|No|

### GetTaskRequest

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier.|Yes|No|
|view|Affects the fields included in the returned Task messages.<br>See TaskView below.|No|No|

### CancelTaskRequest

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier.|Yes|No|

### CreateTaskResponse

|Field|Description|Required|Output Only|
|---|---|---|---|
|id|Task identifier assigned by the server.|Yes|No|

### Ports

|Field|Description|Required|Output Only|
|---|---|---|---|
|container|Port number opened inside the container.|Yes|No|
|host|Port number opened on the host. Must be greater than 1024.<br>Defaults to 0, which assigns a random port on the host.|No|No|

### Resources

|Field|Description|Required|Output Only|
|---|---|---|---|
|cpu_cores|Requested number of CPUs|No|No|
|preemptible|Is the task allowed to run on preemptible compute instances (e.g. AWS Spot)?|No|No|
|ram_gb|Requested RAM required in gigabytes (GB)|No|No|
|size_gb|Requested disk size in gigabytes (GB)|No|No|
|zones|Request that the task be run in these compute zones.|No|No|

