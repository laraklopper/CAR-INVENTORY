
```
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| HTTP Method         | Purpose                                             | Idempotent?                                     |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| GET                 | Retrieve information (safe and idempotent)          | Yes                                             |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| POST                | Submit data to be processed to a specified resource | No                                              |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| PUT                 | Update or create a resource at a specific URI       | Yes                                             |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| PATCH               | Apply partial modifications to a resource           | Not necessarily (depends on the implementation) |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| DELETE              | Delete a resource at a specific URI                 | Yes                                             |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| HEAD                | Retrieve only the headers of a resource             | Yes (should be)                                  |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| OPTIONS             | Get information about the communication options     | Yes                                             |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| TRACE               | Perform a message loop-back test along the path    | Yes                                             |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
| CONNECT             | Establish a network connection to a server          | No                                              |
+---------------------+-----------------------------------------------------+-------------------------------------------------+
```

Notes:
- "Idempotent" means that making the same request multiple times has the same effect as making it once.
- The "Purpose" column provides a brief description of the primary use case for each HTTP method.
