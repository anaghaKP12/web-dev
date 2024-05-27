const express = require('express');
const router = express.Router()
const Post = require('../models/Post');

//Routes
router.get('',async (req,res)=>{
  try{
    const locals = {
        title: "NodeJs Blog",
        description: "Simple blog created with node js express and mongoDb."
    }

    let perPage=2;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{$sort: { createdAt: -1}}]).skip(perPage * page - perPage).limit(perPage).exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);





        res.render('index',{ locals,data,current: page,nextPage: hasNextPage ? nextPage : null });

    }catch(error){
        console.log(error);
    }

});
// router.get('',async (req,res)=>{
//     const locals = {
//         title: "NodeJs Blog",
//         description: "Simple blog created with node js express and mongoDb."
//     }

//     try{
//         const data = await Post.find();
//         res.render('index',{ locals,data });

//     }catch(error){
//         console.log(error);
//     }

// });


router.get('/post/:id',async (req,res)=>{
  try{
      let slug = req.params.id;
      
      const data = await Post.findById({ _id: slug});
      const locals = {
          title: data.title,
          description: "Simple blog created with node js express and mongoDb."
      }
        res.render('post',{ locals,data });

    }catch(error){
        console.log(error);
    }

});

router.post('/search',async (req,res)=>{
    const locals = {
        title: "NodeJs Blog",
        description: "Simple blog created with node js express and mongoDb."
    }

    try{
        let searchTerm = req.body.searchTerm;
       const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g,"")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar,'i')}},
                { body: { $regex: new RegExp(searchNoSpecialChar,'i') }}
            ]
        });
        res.render("search",{
            data,locals
        });

    }catch(error){
        console.log(error);
    }

});





router.get('/about',(req,res)=>{
    res.render('about');
});
router.get('/new-post',(req,res)=>{
    res.render('new-post');
});
router.get('/update-post',(req,res)=>{
    res.render('update-post');
});

module.exports = router;



// async function insertPostData(){
//     try{await Post.insertMany([
//         {
//             title: 'Building a blog',
//             body: 'This is the body text for the first blog post.'
//           },
//           {
//             title: 'Node.js and MongoDB',
//             body: 'Learn how to use Node.js and MongoDB to build powerful web applications.'
//           },
//           {
//             title: 'Web Development Best Practices',
//             body: 'Explore best practices for front-end and back-end development in web applications.'
//           },
//           {
//             title: 'Introduction to CSS Flexbox',
//             body: 'Master the basics of CSS Flexbox layout for building responsive and flexible web designs.'
//           },
//           {
//             title: 'JavaScript Promises Explained',
//             body: 'Understand the concept of promises in JavaScript and how they simplify asynchronous programming.'
//           },
//           {
//             title: 'Creating a RESTful API with Express',
//             body: 'Step-by-step guide to building a RESTful API using Express.js for your web applications.'
//           },
//           {
//             title: 'Responsive Web Design Techniques',
//             body: 'Learn techniques to make your web design responsive and accessible across various devices.'
//           },
//           {
//             title: 'Introduction to React.js',
//             body: 'Get started with React.js, a popular JavaScript library for building user interfaces.'
//           },
//           {
//             title: 'Authentication in Node.js Applications',
//             body: 'Implement user authentication in your Node.js applications for enhanced security.'
//           },
//     ])
// }catch(error){
//     console.error("Error inserting the data")
// }
// }
// (async () => {
//     await insertPostData();
// })();