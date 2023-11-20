# PUT REQUESTS

## UPDATEMULTIPLECARS

**URL:**
```
http://localhost:3001/updateMultipleCars
```
**BODY**
```
{
    "owner": "Lance Stroll",
    "newOwner": "Sammy"
}
```
**RESPONSE:**
```
[
    {
        "_id": "65585f63c4cc52dd74631ddc",
        "make": "Hyndai i20",
        "model": "2010",
        "registration": "CFR 23312",
        "owner": "Sammy",
        "__v": 0
    },
    {
        "_id": "655b3ab8eef66461b30103e5",
        "make": "Hyndai i10",
        "model": "2010",
        "registration": "CFR 23312",
        "owner": "Sammy",
        "__v": 0
    }
]
```
