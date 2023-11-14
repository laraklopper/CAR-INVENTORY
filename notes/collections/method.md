# COLLECTION METHODS

### updateMany

The `updateMany()` function in Mongoose is used to update multiple documents in a MongoDB collection that match a specified filter. Parameters:

```javascript
collection.updateMany(filter, update, options, callback);
```
- `filter`: This parameter defines the selection criteria for the documents that you want to update. It is an object that specifies the conditions that must be met for a document to be selected. For example:

  ```javascript
  const filter = { age: { $gte: 21 } };
  ```

  This filter would select all documents in the collection where the "age" field is greater than or equal to 21.

- `update`: This parameter specifies the modifications to be applied to the selected documents.
- It can include various update operators, such as `$set`, `$inc`, `$push`, etc. For example:

  ```javascript
  const update = { $set: { status: "active" } };
  ```

  This update operation sets the "status" field to "active" for the selected documents.

- `options`: This parameter is an optional object that can be used to specify additional options for the update operation. Some common options include `upsert` (if set to true, it creates a new document if no documents match the filter) & `multi`
  (deprecated in recent MongoDB versions, use `updateMany` instead of `update`).
- `callback`: This is an optional callback function that will be called once the update operation is complete. The callback follows the standard Node.js error-first callback pattern and is invoked with two arguments: `error` and `result`.

`updateMany` with Mongoose:

```javascript
const mongoose = require('mongoose');
const YourModel = mongoose.model('YourModel');

const filter = { age: { $gte: 21 } };
const update = { $set: { status: "active" } };

YourModel.updateMany(filter, update, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
```

In this example, the `updateMany` function is used to update all documents in the "YourModel" collection where the "age" is greater than or equal to 21, setting the "status" field to "active". The callback function logs any errors or the result of the update operation.
