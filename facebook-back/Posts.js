import mongoose from 'mongoose';

const postModel = mongoose.Schema({
	username: String,
	image: String,
	message: String,
	ProfilePic: String,
	timestamp: String,
	likes: Number,
	imageUrl: String
});

export default mongoose.model('posts', postModel);
