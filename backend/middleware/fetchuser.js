const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


const fetchuser = (req, res, next) => {

    const token = req.header("auth-token")

    if (!token) {
        res.status(401).send({ error: "Invalid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        // console.log(data);
        // console.log(req.user);
        // User contains only id
        req.user = data.user; // Putting 'user' into req 
        // console.log(req.user);
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token" });
    }



}

module.exports = fetchuser;