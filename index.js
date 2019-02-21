var express = require('express');
const port = process.env.PORT || 8000;

var app = express();

let postsRoutes = require('./router/postsRouter');
let tagsRoutes = require('./router/tagsRouter');
let categoryRoutes = require('./router/categoryRouter');

var staticDir = express.static(
	path.resolve(__dirname, 'public')
);
app.use(staticDir);

app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postsRoutes);
app.use('/tags', tagsRoutes);
app.use('/categories', categoryRoutes);

app.get('/',(req, res) => {
	res.send("Home");
})

app.listen(port, () => {
	console.log('ahihi');
});
