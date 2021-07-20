const express = require('express')
const Customer = require('../../Models/Customer')
const router = new express.Router()



router.get('/api/get-all/orders', async(req,res) => {
    
    const {id} = req.body
    try{
      const orders = await Customer.find({ _id:id})
      console.log("pass")
      const array = orders.Orders
      console.log("pass")
      return res.json({ status: 'ok', order: orders._id})
    }
    catch(e){
      return res.json({ status: 'error'})
    }
      
  
}) 


module.exports = router