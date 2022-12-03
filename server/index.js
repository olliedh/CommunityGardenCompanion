const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");


const {
   addNewPost,
   getPosts, 

   getPost,
   addComment,
   editPost, 
   deletePost,
//    editComment,
   deleteComment,

  } = require("./MessageHandlers");

  const {

    getTools,
    addNewReservation, 
    getAllReservations,
    test,
    getReservationsByDate,
    isReservedByDate
  } = require("./ToolshedHandlers")

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



// //add a comment to a post
.patch('/post/comment', addComment)
// // get one post 
.get('/post/:_id', getPost)

// //edit a post that was authored by the logged in user
.patch('/post/', editPost)

// //delete a post, same logic as above
.delete('/post', deletePost)

// //edit a comment that was authored by the logged in user
// .patch('/post/:_id/comment/:_id', editComment)
// //delete a comment 
.patch('/post/:_id/comment/:commentId', deleteComment)

//toolshed handlers
//get the inventory of tools
.get('/tools', getTools)

//post a reservation
.post('/reservations/newreservation', addNewReservation )

//get reservations

.get('/reservations', getAllReservations)

.get('/reservations/:date', getReservationsByDate)

.get('/reservations/:date/tools', isReservedByDate)

    .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    });