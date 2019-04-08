const express 		= require('express'),
			bodyParser 	= require('body-parser'),
			mongoose	 	= require('mongoose'),
			cors 				= require('cors'),
			path 				= require('path'),
			CronJob 		= require('cron').CronJob;
const port 				= process.env.PORT || 8000;

var app = express();
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(cors());
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://admin:baohuynh2009@ds139082.mlab.com:39082/heroku_zclj368x', {
// mongoose.connect('mongodb://localhost:27017/PepsiCoca', {
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// Auto call api after seven day
// new CronJob('* * */7 * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');

let verifyAccessToken = require('./controllers/verifyAccessToken');
let authRoutes 				= require('./router/authRouter');
let postsRoutes 			= require('./router/postsRouter');
let productRouter 			= require('./router/productRouter');
let tagsRoutes 				= require('./router/tagsRouter');
let categoryRoutes 		= require('./router/categoryRouter');
let uploadFileRouter 	= require('./router/uploadFileRouter');

var staticDir = express.static(
	path.resolve(__dirname, 'public')
);
app.use(staticDir);


app.get('/', (req, res) => {
	res.send("Home");
});
app.use('/auth', authRoutes);

app.use('/upload', uploadFileRouter)
app.use('/posts', postsRoutes);
app.use('/products', productRouter);
app.use('/tags', tagsRoutes);
app.use('/categories', categoryRoutes);

app.listen(port, () => {
	console.log('ahihi');
});
