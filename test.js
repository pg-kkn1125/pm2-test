const express = require("express");
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 4000;

let isDisableKeepAlive = false;

app.use(function (req, res, next) {
  if (isDisableKeepAlive) {
    res.set("Connection", "close");
  }
  next();
});

app.get("/", (req, res) => {
  console.log("start");
  res.send("test2");
});

app.listen(PORT, () => {
  process.send("ready");
  console.log(`Listening on port ${PORT}: http://localhost:${PORT}`);
});

process.on("SIGINT", function () {
  isDisableKeepAlive = true;

  app.close(function () {
    console.log("server closed");
    process.exit(0);
  });
});
