# MONGOOSE REFERENCES

## MONGOOSE COMPARISON QUERY OPERATORS


### COMPARISON OPERATORS

Comparison operators return data based on value comparisons.


| Operator  | Description                                                          |
-------------------------------------------------------------------------
| `{ <field>: { $eq: <value> } }`       | Matches values that are equal to a specified value.                
| `{ field: { $ne: value } }` | Matches all values that are not equal to a specified value.                                       | 
| `{ field: { $gt: value } }` | Matches values that are greater than a specified value.                       |
| `{ field: { $gte: value } }`| Greater Than or Equal To                           | 
| `{ field: { $lt: value } }` | 	Matches values that are less than a specified value.                                   | 
| `{ field: { $lte: value } }`| Less Than or Equal To                             | 
| `{ field: { $in: [val1, val2] } }` | 	Matches any of the values specified in an array.|
| `{ field: { $nin: [val1, val2] } }` | Matches none of the values specified in an array.                                     | 

### LOGICAL QUERY OPERATORS
Logical operators return data based on expressions that evaluate to true or false.


| Operator  | Description                                                          |
|-----------|----------------------------------------------------------------------|
| $and      | Joins query clauses with a logical AND and returns all documents     |
| $or       | Joins query clauses with a logical OR and returns all documents      |
| $nor      | Joins query clauses with a logical NOR and returns all documents     |
| $not      | Inverts the effect of a query expression and returns documents that do not match the query expression |



### ELEMENT QUERY OPERATORS
Element operators return data based on field existence or data types.



| Operator                 | Description                                           |
|--------------------------|-------------------------------------------------------|
| `{ field: { $exists: true/false } }` | 	Matches documents that have the specified field.                       |
| `{ field: { $type: "type" } }` | Selects documents if a field is of the specified type.                                             | 

### EVALUATION QUERY OPERATORS

Evaluation operators return data based on evaluations of either individual fields or the entire collection's documents.



| Operator                 | Description                                           |
|--------------------------|-------------------------------------------------------|
| `{ field: { $regex: /pattern/, $options: 'i' } }` | Selects documents where values match a specified regular expression.      | 

#### NOTES
- `"field"` represents the field name in your MongoDB document
- `"value"` represents the value you are comparing against. 
