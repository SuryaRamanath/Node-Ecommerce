const express = require('express')
const Products = require('../../Models/Products')
const multer = require('multer')
const router = new express.Router()



const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.root + "/public");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.post('/api/add/products',upload.single("image"), async (req, res) => {
    const { Name, Price, image: base64,Availability, Brand} = req.body
    let ImageURL = process.env.URL + "/public/" + req.file.filename;
    try{
        const product = await Products.create({
            Name, Price, ImageURL,Availability, Brand
        })
       return res.json({ status:'ok', msg:'Product added successfully', Product:product})
        
    }catch(error) {
        return res.json({status:'error', msg:e})
    }
})

router.get('api/get-all/products', async(req,res) => {
    
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
router.get('api/get-one/products', async(req, res) => {
   
        Products.findOne({})
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