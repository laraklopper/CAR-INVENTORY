# DIFFERENCE BETWEEN JSON AND BSON 

![image](https://github.com/laraklopper/LT8-Data-Interaction/assets/135839853/d1c85145-f4d0-45ff-8bc2-d0a9ba946435)




| Feature                   | JSON                                  | BSON                                           |
|---------------------------|---------------------------------------|------------------------------------------------|
| **Representation**        | Text-based                            | Binary                                         |
| **Data Types**            | Basic types (string, number, boolean) | Extended types (binary, date, regex, etc.)      |
| **Efficiency**            | Less compact, slower serialization    | More compact, faster serialization              |
| **Serialization/Deserialization** | Simple, built-in support in many languages | Requires specific libraries/drivers           |
| **Usage**                 | Configuration files, APIs, data interchange | Databases (MongoDB, etc.), efficient storage   |
| **Human Readability**     | Human-readable, easy to write and read | Not human-readable due to binary representation|
| **Compatibility**        | Widely supported                      | Well-supported in MongoDB, may be limited elsewhere |

### FORMAT

**JSON:** is a text-based format, which means it uses human-readable characters to represent data.  While this makes it easy for humans to read and write, it can be less efficient for storage and transmission, especially when dealing with large amounts of binary data.

**BSON:** Binary representation of JSON-like documents. This binary format allows for more compact storage and faster serialisation/deserialisation, making it more efficient for certain use cases, such as when dealing with 
large datasets or when performance is critical.

### DATA TYPES

**JSON:** Supports strings, numbers, null, arrays, and objects

**BSON:** Supports additional data types such as binary data and date types


### SIZE
**JSON:** Text-based encoding of raw, uncompressed JSON can lead to larger documents due to the additional overhead of human-readable characters, but JSON also can be compressed

**BSON:** is more compact as it uses a binary format, resulting in smaller document sizes. Metadata can also increase the overall size

### METADATA
**JSON:** Minimal metadata, which can limit context and require additional processing to determine data types

**BSON:** Includes additional metadata and type information, which increases document size but provides richer context for data

### USAGE

**JSON:** is commonly used for configuration files, APIs, and data interchange between systems where human readability is important. 

**BSON:** is commonly used in databases (especially MongoDB, which uses BSON natively), where efficiency in terms of storage and processing is crucial.
