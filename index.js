const express = require("express");
const path = require('path');
const DDG = require("node-ddg-api").DDG;
const ddg = new DDG("just-search");
const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get("/q", (req, response) => {
  console.log();
  ddg.instantAnswer(req.query.search, { skip_disambig: "1" }, function (
    err,
    res
  ) {
    setTimeout(() => {
      response.send({
        Title: res.Heading,
        SubTitle: res.Text,
        Text: res.Abstract,
        url: res.AbstractURL,
        ImageURL: res.Image,
        QuickSearch: res.RelatedTopics
      });
    },170);
    
  });
});

app.listen(process.env.PORT);
