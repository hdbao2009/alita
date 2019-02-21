var express = require('express');
const port = process.env.PORT || 8000;

var app = express();
app.listen(port, () => {
	console.log('ahihi');
});

app.get('/',(req, res) => {
	
	res.send("Home");
})
app.get('/posts',(req, res) => {
	res.send("Posts");
})
