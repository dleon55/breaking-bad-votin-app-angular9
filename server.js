const path = require("path");

const express = require("express");
const app = express();
app.use(express);

app.use(express.static(__dirname + '/braking-bad-voting-app'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'braking-bad-voting-app', 'index.html'));
});
app.listen(
  {
    port: process.env.PORT || 8080
  },
  () => console.log('Servidor iniciado http://localhost:8080')
);
