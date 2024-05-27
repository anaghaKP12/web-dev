const express = require('express');
const router = express.Router()
const Post = require('../models/Post');


router.post('/add-post', async (req, res) => {
    console.log(req.body)
    const { title, body,createdAt,updatedAt} = req.body;

    try {
        // Create a new post in the database
        const newPost = new Post({
            title,
            body,
            createdAt,
            updatedAt,
            // Add other fields as needed
        });

        // Save the post to the database
        await newPost.save();

        res.redirect('/'); // Redirect to the home page or post list after successful submission
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/update-post/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.render('update-post', { post });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update-post/:postId', async (req, res) => {
    try {
        const { title, body,updatedAt } = req.body;
        await Post.findOneAndUpdate({ _id: req.params.postId }, { title, body, updatedAt });
        res.redirect('/'); // Redirect to the home page or post list after updating
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/delete-post/:postId', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.redirect('/'); // Redirect to the home page or post list after deleting
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;