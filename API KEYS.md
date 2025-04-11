# API KEYS
An API key is a unique identifier used to authenticate software and systems attempting to access other software or systems via an `application programming interface 'API'`.

TABLE OF CONTENTS
1. [HOW TO USE API KEYS](#how-to-use-api-keys)
2. [HOW TO GENERATE API KEYS](#how-to-generate-api-keys)
3. [COMMON PITFALLS](#common-pitfalls)
   
## HOW TO USE API KEYS
### Client-Side Request (Example with `fetch`)

```js
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${api_Key}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### Server-Side Validation (Node.js Example)

```js
// Middleware to verify API Key
const API_KEY = process.env.API_KEY;

function verifyApiKey(req, res, next) {
  const userKey = req.headers['authorization']?.split(' ')[1];

  if (userKey && userKey === API_KEY) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
}
```

## HOW TO GENERATE API KEYS

API keys can be generated using various methods:

- **Manual**: Use `crypto` or `uuid` in Node.js:
```js
const crypto = require('crypto');
const apiKey = crypto.randomBytes(32).toString('hex');
```

- **Database + UI**: Provide a UI for users to generate, rotate, and revoke keys.
- **Services**: Platforms like Firebase, AWS, or RapidAPI which manage keys.

---


## COMMON PITFALLS

- Committing keys to Git repositories
- Using HTTP instead of HTTPS
- Relying solely on API keys for sensitive operations
- Not setting rate limits or expiration for keys
