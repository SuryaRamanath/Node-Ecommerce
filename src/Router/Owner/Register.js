const express = require('express')
const Owner = require('../../Models/Owner')
const bcrypt = require('bcryptjs')
const router= new express.Router();

router.post('/api/register/owner', async(req, res) => {
    const { Name, Number, Email, Password } = req.body
    const password = await bcrypt.hash(Password, 10)
    try{
        const resp = await Owner.create({
            Name, Number, Email, Password:password 
        })
       return res.json({ status:'ok', msg:'Account added successfully', user:resp})
        
    }catch(error) {
        return res.json({status:'error', msg:e})
    }
})

module.exports = router