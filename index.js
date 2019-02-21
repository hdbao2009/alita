var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	multer = require('multer'),
	path = require('path'),
  cron = require('node-cron');
const port = process.env.PORT || 8000;
  
let postsRoutes = require('./router/postsRouter');
let tagsRoutes = require('./router/tagsRouter');
let categoryRoutes = require('./router/categoryRouter');

var app = express();

var staticDir = express.static(
	path.resolve(__dirname, 'public')
);
app.use(staticDir);

// app.use(express.static('dist'));
// app.get('*', (request, response) => {
// response.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req, res) => {
	res.send("Home");
})
app.get('/posts',(req, res) => {
	res.send("Posts");
})

app.listen(port, () => {
  console.log('ahihi');
});