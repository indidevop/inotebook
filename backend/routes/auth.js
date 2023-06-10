const express = require('express')
const router = express.Router();
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'ameyisagood$boy';

// ROUTE 1: Create a user using "api/auth/createUser" - no login required
router.post('/createUser', [
    // Validations
    body('email', 'Enter valid eamil !').isEmail(),
    body('name', 'Name should not be empty and atleat 3 character long').isLength({ min: 3 }),
    body('password', 'Password should not be empty and atleat 3 character long').isLength({ min: 5 })],
    async (req, res) => {

        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Check if user with same email already exists
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, error: "Email already in use" })
            }

            const salt = await bcrypt.genSaltSync(10);
            const secpass = await bcrypt.hash(req.body.password, salt);
            // console.log(secpass);


            user = await User.create({
                name: req.body.name,
                password: secpass,
                email: req.body.email,
            })

            success=true;
            const data = {
                user: {
                    id: user.id,
                }
            }

            // We are returning a token
            const authToken = jwt.sign(data, JWT_SECRET)
            // Token has only user id
            // User id is used to retrieve all the information 
            res.json({ success, authToken })

        } catch (error) {

            console.error(error)
            res.status(500).send("Internal server error")

        }

    })

// ROUTE 2: Authenticate a user using "api/auth/login" - no login required
router.post('/login', [
    // Validations
    body('email', 'Invalid email !').isEmail(),
    body('password', 'Password cant\'t be empty').exists()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let success = false;
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            // console.log(user);
            if (!user) {
                return res.status(400).json({ success, error: "Invalid credentials :(" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Invalid credentials :(" });
            }

            success = true;
            const data = {
                user: {
                    id: user.id,
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ success, authToken })

        } catch (error) {
            console.error(error)
            res.status(500).send("Internal server error")

        }

    })

// ROUTE 3: Get loggedin user's details - requires login
// async function will be called by fetchuser using next()

router.post('/getuser', fetchuser, async (req, res) => {
    // fetchuser has added user:{id} into req
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password') // Select everuthing except password
        res.send(user)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")

    }
})



module.exports = router