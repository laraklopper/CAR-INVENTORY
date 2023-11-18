# MONGOOSE AGGREGATE

## MONGODB

- In MongoDB, the aggregate pipeline is a feature that allows you to process & transform data in a collection using a series of pipeline stages.
- Each stage performs a specific operation on the data, & the output of one stage becomes the input for the next stage.

### Basic overview of how the MongoDB aggregate pipeline works:

1. **$match:** This stage filters the documents based on specified criteria, similar to the `find` method.

   ```javascript
   { $match: { field: value } }
   ```

2. **$project:** This stage reshapes the documents by including, excluding, or renaming fields.

   ```javascript
   { $project: { field1: 1, field2: 1, _id: 0 } }
   ```

3. **$group:** This stage groups documents by a specified key and performs aggregate functions on the grouped data.

   ```javascript
   {
     $group: {
       _id: "$groupingField",
       total: { $sum: "$numericField" },
       average: { $avg: "$numericField" }
     }
   }
   ```

4. **$sort:** This stage sorts the documents based on the specified fields and order.

   ```javascript
   { $sort: { field: 1 } }
   ```

5. **$limit:** This stage limits the number of documents passed to the next stage.

   ```javascript
   { $limit: 10 }
   ```

6. **$skip:** This stage skips a specified number of documents.

   ```javascript
   { $skip: 5 }
   ```

7. **$unwind:** This stage deconstructs an array field from the input documents, creating a new document for each element in the array.

   ```javascript
   { $unwind: "$arrayField" }
   ```

8. **$lookup:** This stage performs a left outer join to another collection in the same database.

   ```javascript
   {
     $lookup: {
       from: "anotherCollection",
       localField: "localField",
       foreignField: "foreignField",
       as: "alias"
     }
   }
   ```

#### Using multiple stages in an aggregate pipeline:

```javascript
db.collection.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$type", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $project: { _id: 0, type: "$_id", total: 1 } }
])
```

This example filters documents with the status "A," groups them by the "type" field, calculates the total amount for each type, sorts the results by total in descending order, and finally projects the type and total fields while excluding the _id field.
