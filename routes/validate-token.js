const jwt = require('jsonwebtoken')


// validate token 
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Access denied' })
    try {
        const verified = jwt.verify(token, "secret")
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({error: 'token is not valid'})
    }
}

module.exports = verifyToken;