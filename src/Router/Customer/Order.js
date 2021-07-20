const express = require('express')
const Customer = require('../../Models/Customer')
const Products = require('../../Models/Products')
const router = new express.Router()


router.post('/api/order',async (req, res) => {
    const { userid, productid } = req.body;

    try{
        await Customer.findOneAndUpdate(
            { _id:userid },
            {
              $push: {
                Orders: [
                  {
                    order: productid,
                  },
                ],
              },
            }
          );
          await Products.findOneAndUpdate(
            { _id:productid },
            {
              $push: {
                Orders: [
                  {
                    customer: userid,
                  },
                ],
              },
            }
          );
          return res.json({status:'ok', msg: 'order created successfully'})
    }catch(e){
        return res.json({status:'error', msg:e})
    }
    
})

module.exports = router