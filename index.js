var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	path = require('path');
const port = process.env.PORT || 8000;

var app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://admin:baohuynh2009@ds139082.mlab.com:39082/heroku_zclj368x', {
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;

let postsRoutes = require('./router/postsRouter');
let tagsRoutes = require('./router/tagsRouter');
let categoryRoutes = require('./router/categoryRouter');

var staticDir = express.static(
	path.resolve(__dirname, 'public')
);
app.use(staticDir);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send("Home");
});

app.use('/posts', postsRoutes);
app.use('/tags', tagsRoutes);
app.use('/categories', categoryRoutes);

app.listen(port, () => {
	console.log('ahihi');
});