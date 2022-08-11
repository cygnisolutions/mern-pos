const express = require("express");
const BillModel = require("../models/billModel");
const router = express.Router();

router.get("/get-all-bills", async (req, res, next) => {
    try {
      const bills = await BillModel.find();
      res.status(200).send(bills);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  
router.post("/charge-bill", async (req, res, next) => {
  try {
    const newBill = new BillModel(req.body);
    await newBill.save();
    res.status(200).send('Bill Charged Successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;
