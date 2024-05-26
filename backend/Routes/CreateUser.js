const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecret = "kns1Rj4FPavcfkC8uVcL6wF53AaBrE"
router.post("/signup",
    body('email').isEmail(), body('name').isLength({ min: 3 }), body('password').isLength({ min: 6 }), async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // const result = validationResult(req);
        // if (result.isEmpty()) {
        //   return res.send(`Hello, ${req.query.person}!`);
        // }

        // res.send({ errors: result.array() });

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name : req.body.name,
                email: req.body.email,
                password: secPass,
                location: req.body.location,

            }).then(res.json({ success: true }))

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
router.post("/login", body('email').isEmail(), body('password').isLength({ min: 6 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email })
        if (!userdata) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" })
        }
        const pwdComp = await bcrypt.compare(req.body.password,userdata.password)
        if (!pwdComp) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" })
        }
        const data = {
            user:{
                id:userdata.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({ success: true,authToken:authToken })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})
module.exports = router;