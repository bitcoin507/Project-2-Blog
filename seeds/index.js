const { User, Category, Comment, Post } = require('../models');

// variables for the seed
//import the data from the json file to be used in the database using fs module to read the file 
const categorySeed = require('./categorySeedData.json');
const userSeed = require('./userSeedData.json');
const postSeed = require('./postSeedData.json');
//const postSeed = require('./postSeedData.json');
//const commentSeed = require('./commentSeedData.json');

//test this function to see if it works
//const { title, comment } = commentSeed[0]; //get the title and comment from the commentSeedData.json file and deconstruct the object
//const { name, email, password } = userSeed[0]; //destructuring the userSeed
//const { cat1, cat2, ...rest} = userSeed[0];

const sequelize = require('../config/connection'); //import the connection to be used in the database  
// const {category, post, comment, user} = require('../models'); // destructuring the models

//async function to seed the database
async function seed() {  //async function to seed the database
    try {
        await sequelize.sync({ force: true }); //sync the database 
        const categories = await Category.bulkCreate(categorySeed); //insert the data from the json file into the database
        const users = await User.bulkCreate(userSeed); //insert the data from the json file into the database
        const posts = await Post.bulkCreate(postSeed); //insert the data from the json file into the database

        //const comment = await comment.bulkCreate(commentSeed); //insert the data from the json file into the database
        //const post = await Post.bulkCreate(postSeed); //insert the data from the json file into the database
        //const comment = await comment.bulkCreate(commentSeed); //insert the data from the json file into the database
    }
    catch (err) { // if there is an error, console log the error
        console.log(err);
    }

    /*
    //create a new post
    const post = await post.create({
        title: 'My first post',
        body: 'This is my first post',
        category_id: 1,
        user_id: 1
    });

    //create a new comment
    const comment = await comment.create({
        comment: 'This is my first comment',
        post_id: 1,
        user_id: 1
    }); //end of async function

        //console log the post and comment
    console.log(post);
    console.log(comment);
*/


    process.exit(0);
}

seed();





