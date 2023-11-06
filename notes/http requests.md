#   HYPERTEXT TRANSFER PROTOCOL ("HTTP")

## TABLE OF CONTENTS
1. [HTTP](#http)
2. [HTTP METHODS](#http-methods)
3. [INDEMPOTENT REQUESTS](#indempotent-requests)
4. [REFERENCES](#references)

## HTTP
HTTP is an underlying protocol used by the World Wide Web. In computing a protocol is the set of rules and procedures that describes how data is exchanged. Internet protocols are the protocols which govern the communication and exchange of data over the internet. 

HTTP defines how messages are formed and transmitted between clients and servers, and what actions web servers and clients should take in response to various commands. 
A HTTP protocol is a stateless one. A stateless protocol is a protocol where the server does not hold the state of its client. Stateless protocols are network protocols where the Client sends the request to the server and the server responds back according to its current state.  Each request is a new request.

## HTTP METHODS
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

## IDEMPOTENT REQUEST
- An HTTP method is idempotent if the intended effect on the server of making a single request is the same as the effect of making several identical requests. This does not necessarily mean that the request does not have any unique side effects: for example, the server may log every request with the time it was received. Idempotency only applies to the effects intended by the client

## REFERENCES
- https://assertible.com/blog/7-http-methods-every-web-developer-should-know-and-how-to-test-them#patch
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
- https://developer.mozilla.org/en-US/docs/Glossary/Idempotent
- https://developer.mozilla.org/en-US/docs/Glossary/Protocol
- https://www.geeksforgeeks.org/types-of-internet-protocols/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
