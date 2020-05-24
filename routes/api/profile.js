const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../MiddleWare/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        console.log(req.user);
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', [auth,
    [check('accountNumber', 'accountNumber is required and should be of Length 10').not().isEmpty().isLength({
        min: 10,
        max: 10
    })]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        accountNumber,
        balance,
        accountType
    } = req.body;

    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (accountNumber) profileFields.accountNumber = accountNumber;
    if (balance) profileFields.balance = balance;
    if (accountType) profileFields.accountType = accountType;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //Update Profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        // Create Profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch (error) {
        if(error.code == 11000) {
            return res.status(400).json({msg: 'No Duplicate Key for Account Number'})
        }
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile
// @desc   Get all user profile
// @access Private
router.get('/', async (req, res) => {
    try {
        let profile = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/profile/:user_id
// @desc   DELETE user and profile
// @access Private
router.delete('/:user_id', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({user: mongoose.Types.ObjectId(req.params.user_id)});
        // await User.findByIdAndRemove({_id: req.params.user_id});
        res.json({msg: 'User removed Successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;