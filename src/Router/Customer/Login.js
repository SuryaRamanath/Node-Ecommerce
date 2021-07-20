const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require('../../Models/Customer')
const express = require('express')
const router = new express.Router()

router.post('/api/login/customer', async (req, res) => {
  const { Email, Password } = req.body;
  const user = await Customer.findOne({ Email }).lean();
  if (!user) {
    return res.json({ status: "error", msg: "Invalid email/password" });
  }

  if (!(await bcrypt.compare(Password, user.Password))) {
    return res.json({ status: "error", msg: "Invalid username/password" });
  }

  try {
    const token = jwt.sign(
      { id: user._id, Name: user.Name },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    await Customer.findOneAndUpdate(
      { Email },
      {
        $push: {
          tokens: [
            {
              token: token,
            },
          ],
        },
      }
    );
    const userr = await Customer.findOne({ Email }).lean();

    return res.json({
      status: "OK",
      msg: "Loged in successfully",
      user: userr,
    });
  } catch (e) {
    return res.json({ status: "error" , error:e});
  }
});

module.exports = router;
