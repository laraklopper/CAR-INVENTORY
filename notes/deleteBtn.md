# DELETE BUTTON


## Example one

### app.js (EXPRESS SERVERSIDE)

```
router.delete('/Delete_Data',  (request, response) => {
    item.findOneAndDelete({}, (err, data) => {
        if(err){
            console.log(err);
            return response.status(500).send();
        }
        else{
            return response.json({data});
        }
    });
    
});
```
### APP.js (REACT CLIENT
```
async function deleteLSItem(){
  
  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch('/Delete_Data' , options);
  const data = await response.json();
  console.log(data);
}
```

## REFERENCES

- https://stackoverflow.com/questions/65889230/how-to-delete-data-from-mongoose-collection-by-onclick
