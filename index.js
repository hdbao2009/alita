var express = require('express');

var app = express();

const port = process.env.POST || 8000;

app.get('/', (req, res) => {
	res.send('Hello world');
})

app.listen(port, () => {
  console.log('ahihi');
});