# DIFFERENCE BETWEEN JSON AND BSON 

JavaScript Object Notation('JSON') and BSON (Binary JSON) are both data interchange formats used to represent structured data in a human-readable and machine-readable way. 
They are closely related, but BSON is an extension of JSON that adds additional data types and supports binary data for more efficient serialization and deserialization.

## DATA TYPES

JSON supports a limited set of data types, including strings, numbers, booleans, arrays, objects, and null. However, JSON lacks specific types for binary data and dates.

BSON extends the data types supported by JSON and includes additional types such as binary data, date, timestamp, regular expression, and more. 
This makes BSON more suitable for representing a wider range of data types.

## BINARY FORMAT

JSON is a text-based format, which means it uses human-readable characters to represent data. 
While this makes it easy for humans to read and write, it can be less efficient for storage and transmission, especially when dealing with large amounts of binary data.

BSON, on the other hand, is a binary representation of JSON-like documents. 
This binary format allows for more compact storage and faster serialisation/deserialisation, making it more efficient for certain use cases, such as when dealing with 
large datasets or when performance is critical.

## SIZE
JSON documents tend to be larger in size compared to equivalent BSON documents due to the additional overhead of human-readable characters.

BSON is more compact as it uses a binary format, resulting in smaller document sizes.
## USAGE

JSON is commonly used for configuration files, APIs, and data interchange between systems where human readability is important. 

BSON is commonly used in databases (especially MongoDB, which uses BSON natively), where efficiency in terms of storage and processing is crucial.
