const express = require('express')
const Customer = require('../../Models/Customer')
const router = new express.Router()



router.get('/api/get-all/orders', async(req,res) => {
    
    const {id} = req.body
    try{
      const orders = await Customer.find({ _id:id}).lean()
      let array = orders[0].Orders 
      return res.json({ status: 'ok', orders: orders[0].Orders})
    }
    catch(e){
      return res.json({ status: 'error'})
    }
    
  
}) 


module.exports = router