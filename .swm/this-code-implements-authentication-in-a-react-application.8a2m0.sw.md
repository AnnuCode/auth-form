---
id: 8a2m0
title: This code implements authentication in a React application.
file_version: 1.1.1
app_version: 1.0.19
---

<br/>

<br/>

handleSubmit function listens on the click of Submit button.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/components/Login.jsx
<!-- collapsed -->

```javascript
25       const handleSubmit = async (e) => {
26         //async function always returns a promise
27         e.preventDefault();
28         console.log(user, pwd);
29         try {
30           const response = await axios.post(
31             //await uses yield statements
32             Login_URL,
33             JSON.stringify({ username: user, password: pwd }),
34             {
35               headers: { "Content-Type": "application/json" },
36               withCredentials: true,
37             }
38           );
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBYXV0aC1mb3JtJTNBJTNBQW5udUNvZGU=/docs/8a2m0).