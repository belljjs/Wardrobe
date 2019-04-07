// const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
// const config = require('../../config');
const { createUser } = require('../models/auth/signUp');
const bcrypt = require('bcrypt');
require('dotenv').config();


const tokenForUser = (user) => {
    
    const payload = {
        sub: user.id, 
        iat: new Date().getTime(), 
        exp: 3600 
    }

    // need to hide password later --- config ???
    return jwt.sign(payload, process.env.REACT_APP_SECRET_KEY);
}

const signin = (req,res,next) => {
    console.log( " In controller starting signin... ");
    console.log( " varified user : ", req.user );
   
    const {email, password} = req.body;
    console.log( " Before res.json..." );
    const token = tokenForUser(req.user);
    console.log( " tokenForUser(req.user):",tokenForUser(req.user) );

    res.send({
        token: token,
        userId: req.user.id, 
        message: "Successfully signed in",
        exp: 3600
    })
    
}

const signup = async(req,res,next) => {
    const {firstName, lastName, email, password} = req.body;
    saltRounds = 12
    try{
        const hash = await bcrypt.hash(password,saltRounds);
        console.log("hash:",hash);

        const newUser = await createUser(firstName, lastName, email, hash)
        console.log("newUser:",newUser);
        console.log("Successfully user created")

        const token = tokenForUser(newUser)
        res.send({
            token: token, 
            userId: newUser.id,
            message:"Successfully signed up",
            exp: 3600
        });

    }
    catch(error) {
        console.log("Sign up error ", error.detail, " ---------")
        res.status(400).send(error.detail);
    }
}

module.exports = { signin, signup }

