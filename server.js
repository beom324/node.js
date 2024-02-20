var http = require("http");
var express = require("express");
var app = express();

var dao = require("./BookDAO");

app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

app.post("/insertBook", async function (req, res) {
  var doc = req.body;
  var bookid = await dao.getNextBookID();
  doc.bookid = bookid;
  var re = await dao.insertBook(doc);
  res.send(re + "");
});

app.get("/listBook", async function (req, res) {
  var arr = await dao.listBook();
  console.log(arr);
  res.send(arr);
});

app.post("/updateBook", async function (req, res) {
  var doc = req.body;
  var re = await dao.updateBook(doc);
  res.send(re + "");
});

app.post("/deleteBook", async function (req, res) {
  var doc = req.body;
  var bookid = doc.bookid;
  var re = await dao.deleteBook(bookid);
  res.send(re + "");
});

http.createServer(app).listen(52273, "192.168.0.87", function () {
  console.log("서버가 가동됨 http://192.168.0.87:52273");
});
