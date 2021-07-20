require("dotenv").config({ path: "./.env" });
const express = require("express");
require("./connect/mongoose");

const CustomerRegisterRouter = require('./Router/Customer/Register')
const CustomerLoginRouter = require('./Router/Customer/Login')
const OwnerRegisterRouter = require('./Router/Owner/Register')
const OwnerLoginRouter = require('./Router/Owner/Login')
const AddProductRouter = require('./Router/Owner/AddProducts')
const OrderRouter = require('./Router/Customer/Order')
const ViweProductRouter = require('./Router/Customer/ViewProducts')
const ViewOrders = require('./Router/Customer/ViewOrder')
const GetOrders = require('./Router/Owner/GetOrders')

const app = express();
app.use(express.json());
app.use(CustomerRegisterRouter)
app.use(CustomerLoginRouter)
app.use(OwnerRegisterRouter)
app.use(OwnerLoginRouter)
app.use(AddProductRouter)
app.use(OrderRouter)
app.use(ViweProductRouter)
app.use(ViewOrders)
app.use(GetOrders)
const port = process.env.PORT || 7000;

app.listen(port, "0.0.0.0", () => {
  console.log("Server is up on port " + port);
});
