var express = require('express');

var app = express();

const port = process.env.POST || 8000;

app.listen(port, () => {
  console.log('ahihi');
});

app.get('/', (req, res) => {
	res.send('Hello world');
})
