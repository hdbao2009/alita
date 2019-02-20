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

mongoose.set('useCreateIndex', true);
// mongodb://localhost:27017/cocapepsi
// mongodb://heroku_dlvd3rnn:apf38654g5133ttdqrdnt9p4q4@ds341825.mlab.com:41825/heroku_dlvd3rnn
mongoose.connect('mongodb://localhost:27017/cocapepsi', {
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postsRoutes);
app.use('/tags', tagsRoutes);
app.use('/categories', categoryRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('ahihi');
});

app.get('/', (req, res) => {
	res.send('Hello world');
})
