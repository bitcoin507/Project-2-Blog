const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

/* CREATE a new user
router.post('/signup', async (req, res) => {

  console.log('req.body: ', req.body);
  const confirm = await User.find({ Username: req.body.username, email: req.body.email })
  confirm && res.status(400).json('this user or email already exist');
  try {
    const newUser = req.body;
    const salt = await bcrypt.genSalt(10);
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    salt = await bcrypt.genSalt(10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);

    // Saving Sessions
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;

      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
}); */




// CREATE a new user
router.post('/', async (req, res) => {
  try{
      //Check if the user already exists
      const user = await User.findOne({ 
        where: { 
          email: req.body.username,
        },
      });
        if (user) {
          res .status(400).json({message:'this user or email already exist'});
          return;
        }
        else {
          
          const salt = await bcrypt.genSalt(10);
         // hash the password from 'req.body' and save to user
          user.password = await bcrypt.hash(req.body.password, 10);
          salt = await bcrypt.genSalt(10);
         // create the newUser with the hashed password and save to DB
          const dbUserData  = await User.create(req.body);

        req.session.save(() => {
          req.session.logged_in = true;
          res.status(200).json(dbUserData);
        });
        } 
      } catch (err) { 
        res.status(400).json(err);  
      }     
} );    
     
 
  

          
  

//Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({
      where: { email },
    });
    if (!userData) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }
    req.session.logged_in = true;
    req.session.user_id = userData.id;
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//Logout
router.get('/logout', (req, res) => {
  req.session.destroy();  // destroy the session
  res.status(200).json({ message: 'Logged out successfully' });
})





//UPDATE a user
router.put('/updateUser', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.password === req.body.password) {
      await User.updateOne({ $set: req.body });
      res.status(200).json('user updated');
    } else {
      res.status(403).json('User Info does not match');
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//Delete a user
router.delete('/deleteUser', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.password === req.body.password) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json('user deleted');
    } else {
      res.status(403).json('User Info does not match');
    }
  } catch (error) {
    res.status(500).json(error)
  }
})



//get All users
router.get('/searchUsers', async (req, res) => {
  try {
    const users = await Post.find();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json(error);
  }
})
//Get user by id
router.get('/userName', async (req, res) => {
  try {
    const user = await Post.findById(req.params.id);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json(error);
  }
})


module.exports = router;