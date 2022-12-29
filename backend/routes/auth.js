const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { validationResult, body } = require('express-validator');
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")

const JWT_SECRET = "SignedBy%Dr@Legend%"


//Creating a new user using the /api/auth/createuser request
router.post('/createuser', [
    body('username').isLength({ min: 5 }),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
],
    async (req, res) => {
        //Checking if the parameters satisfy the minimum required conditions
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        else {
            //Check whether the user has unique username and email by checking in the database
            try {
                if (await User.findOne({ username: req.body.username })) {
                    return res.status(400).json({ errors: "Sorry the user with this username already exists" })
                }
                else if (await User.findOne({ email: req.body.email })) {
                    return res.status(400).json({ errors: "Sorry the user with this email already exists" })
                }
                else {
                    //Securing the data
                    const salt = await bcrypt.genSalt(10)
                    const securedPassword = await bcrypt.hash(req.body.password, salt)

                    //Saving the data to the database
                    let user = await User.create({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: securedPassword,
                    })

                    //data stores the payload or the static info of the user that has just been authenticated to enter
                    const data = {
                        id: user.id
                    }
                    //generating a token to be used to access different sections of the website
                    const authToken = jwt.sign(data, JWT_SECRET)
                    res.json({ authToken })
                }
            }
            catch (error) {
                console.error(error.message)
                res.status(500).send("Some internal server error occured")
            }
        }
    })

//Logging a user to the website using the /api/auth/login route
router.post('/login', [
    // body('username'),
    body('email', "Please enter a valid email id").isEmail(),
    body('password', "Password cannot be blank").exists()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        else {
            //Checking if the user exists on our database
            const { email, password } = req.body

            try {
                let user = await User.findOne({ email })
                if (!user) {
                    return res.status(400).json({ errors: "Invalid email" })
                }

                const passwordCompare = await bcrypt.compare(password, user.password)
                if (!passwordCompare) {
                    return res.status(400).json({ errors: "Invalid password entered" })
                }
                //data stores the payload or the static info of the user that has just been authenticated to enter
                const data = {
                    id: user.id
                }
                //generating a token to be used to access different sections of the website
                const authToken = jwt.sign(data, JWT_SECRET)
                res.json({ authToken })

            } catch (error) {
                console.error(error.message)
                res.status(500).send("Some internal server error occured")
            }

        }
    })

module.exports = router
