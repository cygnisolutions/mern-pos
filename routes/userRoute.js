const express = require("express");
const bcrypt = require('bcryptjs');
const UserModel = require("../models/userModel");
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post("/login", async (req, res, next) => {
  try {
    
    const user = await UserModel.findOne({userId: req.body.userId, verified: true})

    //console.log(user);

    if(user){

        const isAuth = await bcrypt.compare(req.body.password, user.password)

        //console.log(isAuth);
        
        if(isAuth){

             let token;
             token = await jwt.sign({userId: req.body.userId},'VWSRxg0zTYfuGpMX', {expiresIn: '1h'});

             //console.log(token);

            res.status(200).send({
                user: user,
                token: token
            });
        }
        else{
            res.status(400).send('Wrong Password');
        }
    }
    else{ 
        res.status(400).send('Login Failed');
    }
    
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/register", async (req, res, next) => {
    try {
      //const newUser = new UserModel({...req.body, verified: false});
      const name = req.body.name;
      const userId = req.body.userId;
      const password = req.body.password;

      const hashPassword= await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        name: name,
        userId: userId,
        password: hashPassword,
        verified: false
    })

      await newUser.save();

      res.status(200).send({userId: newUser._id});

    } catch (error) {
      res.status(400).send(error);
    }
  });



module.exports = router;
