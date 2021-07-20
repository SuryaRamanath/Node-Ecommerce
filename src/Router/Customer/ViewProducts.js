const express = require('express')
const Products = require('../../Models/Products')
const router = new express.Router()



router.get('/api/get-all/products', async(req,res) => {
    
    const products = await Products.find({})
      .then((pros) => {
        res.json({
          status: "ok",
          msg: "received all the products",
          data: pros,
        });
      })
      .catch((err) => {
        res.json({
          status: "error",
          msg: err,
        });
      });
  
})
router.get('/api/get-one/products', async(req, res) => {
  const {id} = req.body
    Products.findOne({_id:id})
      .then((pro) => {
        res.json({
          status: "ok",
          msg: "received the product",
          data: pro,
        });
      })
      .catch((err) => {
        res.json({
          status: "error",
          msg: err,
        });
      });
})

module.exports = router