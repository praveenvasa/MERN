const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register
// @access Public
router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please Enter Valid Email').isEmail(),
    check('password', 'Password should be of Length 6 or more').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
    //See if user Exists
    let user = await User.findOne({email});
    if(user) {
        return res.status(400).json({errors: [{msg: 'User Already Exists'}]});
    }
    //Get the user avatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    user = new User({
        name,
        email,
        avatar,
        password
    });
    //Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    //Return jsonwebToken Auth
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        {expiresIn: 36000},
        (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;