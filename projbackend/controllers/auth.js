const User = require('../models/user');

// For validation
const { check, validationResult } = require('express-validator');

var jwt = require('jsonwebtoken');
var expressJwt= require('express-jwt');

//-----------------------------------

// Signup
// Controllers and routes are connected we export signout from here to routes auth.js
exports.signup = (req, res) => {
    //console.log('REQ BODY-->', req.body);
    const errors = validationResult(req)

    if(!errors.isEmpty()){
       return res.status(422).json({
           //error: errors.array()[0].param,
           error: errors.array()[0].msg,
           parameter: errors.array()[0].param,
       });
    }


  const user = new User(req.body);
  user.save((err, user)=>{
      if(err){
          return res.status(400).json({
              err: 'NOT able to save user in DB'
          });
      }
      res.json({
          //insted of writing whole thing to retrive all data just type res.json(user)
          name: user.name,
          email: user.email,
          id : user.id
      });
  });

};



//-----------------------------------

// Signin
exports.signin = (req, res) => {

const errors = validationResult(req);
console.log('REQ BODY-->', req.body);
//destructuring
const {email,password} = req.body;

if(!errors.isEmpty()){
    return res.status(422).json({
        //error: errors.array()[0].param,
        error: errors.array()[0].msg,
        parameter: errors.array()[0].param,
    });

}

User.findOne({ email },(err, user)=>{
    if(err || !user){
        return res.status(400).json({
            error: '🙃 User email Does not exists'
        });
    }
    if(!user.authenticate(password)){
return res.status(401).json({
    error: '🙃 Sorry! ;-) Email and Password does not match'
})
    }
const token = jwt.sign({_id:user._id}, process.env.SECRET);
//put token in cookie
res.cookie('token', token, {expire:new Date()+9999});
// send response to front end

const {_id, name, email, role}= user;
return res.json({token, user:{_id, name, email, role} });

});

};


//-----------------------------------


exports.signout = (req, res) => {
    // clears cookie
    res.clearCookie('token');
    
    res.json({
        message: 'User signout successfully'
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret:'prohuman',
    userProperty: 'auth'
});


//---------> custom middlewares

exports.isAuthenticated = (req, res, next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:'ACCESS DENIED 🙃'
        })
    }
    next();
}

//for admin
exports.isAdmin = (req, res, next)=>{
//check the role which is set in ../models/user.js
    if(req.profile.role === 0){
        return res.status(403).json({
            error:'You are not ADMIN ;) ---->🙃 ACCESS DENIED'
        })
    }
    next();
}