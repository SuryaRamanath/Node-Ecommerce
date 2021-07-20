const jwt = require('jsonwebtoken')
const Owner = require('../../Models/Owner')

const authO = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
        const user = await Owner.findOne({ _id: decoded.id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }
        req.token=token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = authO