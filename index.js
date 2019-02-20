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
mongoose.connect('mongodb://admin:baohuynh2009@ds139082.mlab.com:39082/heroku_zclj368x', {
	useNewUrlParser: true
}).then(() => {
	console.log("connect duoc roi");
});
mongoose.Promise = global.Promise;

app.listen(port, () => {
  console.log('ahihi');
});

app.use(cors());
app.use(bodyParser.json());

app.use('/posts', (req, res) => {
	res.send("posts");
});
app.use('/tags', tagsRoutes);
app.use('/categories', categoryRoutes);



app.get('/', (req, res) => {
	res.send('Hello world');
})
