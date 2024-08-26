const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const app = express();

// Route requests to the auth service
// app.use("/auth", (req, res) => {
//   proxy.web(req, res, { target: "http://auth:3000" });
// });

// Route requests to the user-management service
app.use("/user", (req, res) => {
  console.log("hello");
  
  proxy.web(req, res, { target: "http://localhost:3001" });
});



// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
