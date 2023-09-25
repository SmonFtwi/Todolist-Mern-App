const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');


//routes
router.get('/' , (req, res) => {
    res.send('hello')
})

router.get('/user' , async(req, res) => {
  const user = await User.find();
  res.json(user)
})

router.post('/register' , async(req, res) => { 
try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    await user.save();
    res.json({status: 'ok'});
    console.log({user})
  }catch(err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred during registration' })
  }
})

router.post('/login' , async(req, res) => {
    try{
   const user = await User.findOne({
    email: req.body.email,
   })
   if(!user) {
    return res.status(401).json({ status: 'error', error: 'Invalid email' });
   }
   const ispasswordValid = await bcrypt.compare(req.body.password , user.password)
   if (ispasswordValid){

      const token = jwt.sign({id: user._id, name:user.name,email:user.email },process.env.secret)
    

      return res.json({status: 'ok', user:token})
   }else{
    return res.status(401).json({ status: 'error', error: 'Invalid password' });
   }
}catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ status: 'error', error: 'An error occurred during login' });
  }
})





module.exports = router;