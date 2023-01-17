import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';
import Posts from './Posts.js';

Grid.mongo = mongoose.mongo;

const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
	appId: '1116620',
	key: '1b857f51315956e46810',
	secret: 'fae011261da23ef34af6',
	cluster: 'ap2',
	useTLS: true
});

//middlewares
app.use(bodyParser.json());
app.use(cors());

//db config
const mongoURI = 'mongodb+srv://admin:wsSkVrJAQiMSC4fg@cluster0.etsux.mongodb.net/fbdb?retryWrites=true&w=majority';

const conn = mongoose.createConnection(mongoURI, {
	useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true
});

mongoose.connect(mongoURI, {
	useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true
});

conn.once('open', () => {
	console.log('conn is connected');
});

const fbdb = mongoose.connection;

fbdb.once('open', () => {
	console.log('fbdb is connected');

	const changeStream = fbdb.collection('posts').watch();

	changeStream.on('change', (change) => {
		console.log(change);

		if (change.operationType === 'insert') {
			console.log('pusher triggerd');

			pusher.trigger('posts', 'inserted', {
				change: change
			});
		} else {
			console.log('error triggering pusher');
		}
	});
});

let gfs;

conn.once('open', () => {
	console.log('DB connected');

	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('fs');
});

const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			{
				const filename = `image-${Date.now()}${path.extname(file.originalname)}`;

				const fileInfo = {
					filename: filename,
					bucketname: 'fs'
				};

				resolve(fileInfo);
			}
		});
	}
});

const upload = multer({ storage });

//api routes
app.get('/', (req, res) => res.status(200).send('hello facebook'));

app.get('/retrieve/image/single', (req, res) => {
	gfs.files.findOne({ filename: req.query.name }, (err, file) => {
		if (err) {
			res.status(500).send(err);
			console.log(err);
		} else {
			if (!file || file.length === 0) {
				res.status(404).json({ err: 'file not found' });
				console.log(err);
			} else {
				const readStream = gfs.createReadStream(file.filename);
				readStream.pipe(res);
			}
		}
	});
});

app.get('/retrieve/posts', (req, res) => {
	Posts.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			data.sort((b, a) => {
				return a.timestamp - b.timestamp;
			});

			res.status(200).send(data);
		}
	});
});

app.post('/upload/image', upload.single('file'), (req, res) => {
	res.status(201).send(req.file);
});

app.post('/upload/post', (req, res) => {
	const dbPost = req.body;

	Posts.create(dbPost, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.put('/like/update', (req, res) => {
	const postId = req.body;
	console.log(postId);
	Posts.updateOne({ _id: objectId(postId) }, { likes: likes + 1 }, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('success');
		}
	});
});

app.put('/dislike/update', (req, res) => {
	const postId = req.body;
	console.log(postId);
	Posts.updateOne({ _id: objectId(postId) }, { likes: likes - 1 }, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('success');
		}
	});
});

app.listen(port, () => console.log(`flying on port: ${port}`));
