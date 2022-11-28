const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");


const {
   addNewPost,
   getPosts, 
//    getTitles,
//    getPost,
//    addComment,
//    editPost, 
//    deletePost,
//    editComment,
//    deleteComment,
//    addUser
  } = require("./handlers");

const port = 8000;
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))
    .get('/hello', (req, res) => {
    res.status(200).json({status: 200, message:'Hello World!'});
    })
//add a post to the database
    .post('/post/newpost', addNewPost)
//get all posts from the database
    .get('/posts', getPosts)
// //get all post titles from the database
// .get('/posts/titles', getTitles)
// // get one post 
// .get('/post/:_id', getPost)

// //add a comment to a post
// .patch('/post/:id/comment', addComment)

// //edit a post that was authored by the logged in user
// .patch('/post/:_id', editPost)
// //delete a post, same logic as above
// .delete('/post/:_id', deletePost)
// //edit a comment that was authored by the logged in user
// .patch('/post/:_id/comment/:_id', editComment)
// //delete a comment 
// .patch('/post/:_idcomment/:_id', deleteComment)`



    .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    });