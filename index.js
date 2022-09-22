const express = require("express");
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3000;

let isDisableKeepAlive = false;

app.use(function (req, res, next) {
  if (isDisableKeepAlive) {
    res.set("Connection", "close");
  }
  next();
});

app.get("/", (req, res) => {
  console.log(process.env.NODE_ENV);
  res.send("magic");
});
app.get("/api/test", (req, res) => {
  console.log("error exception");
  res.send("error");
});

app.listen(PORT, () => {
  process.send("ready");
  console.log(`Listening on port ${PORT}: http://localhost:${PORT}`);
});

process.on("SIGINT", function () {
  isDisableKeepAlive = true;
  console.log("test sigint");
	
  app.close(function () {
    console.log("server closed");
    process.exit(0);
  });
});
