const express = require('express')
const Products = require('../../Models/Products')
const router = new express.Router()



router.get('api/get-all/orders', async(req,res) => {
    
    const {id} = req.body
    try{
      const orders = await Products.find({ _id:id})
      const orderArray = orders.Orders
      return res.json({ status: 'ok', orders:orderArray})
    }
    catch(e){
      return res.json({ status: 'error'})
    }
      
  
})


module.exports = router