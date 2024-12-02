import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async(req, res) => {
    try {
        const postMsgs = await PostMessage.find();
        
        res.status(200).json(postMsgs);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const createPosts = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({message: err.message});
    }
}

export const updatePost = async(req, res) => {
    const { id: _id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with this id");
    
    const updatedPost = { creator, title, message, tags, selectedFile, _id: _id };
    await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with this id");

    await PostMessage.findByIdAndDelete(id);
    res.json({message: "post deleted successfully"});
}

export const likePost = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with this id");

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount : post.likeCount+1}, {new:true});

    res.json(updatedPost);
}