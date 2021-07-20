const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require('../../Models/Owner')
const express = require('express')
const router = new express.Router()

router.post('/api/login/owner', async (req, res) => {
  const { Email, Password } = req.body;
  const user = await Owner.findOne({ Email }).lean();
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

    await Owner.findOneAndUpdate(
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
    const userr = await Owner.findOne({ Email }).lean();

    return res.json({
      status: "OK",
      msg: "Loged in successfully",
      user: userr,
    });
  } catch (e) {
    return res.json({ status: "error" });
  }
});

module.exports = router;
