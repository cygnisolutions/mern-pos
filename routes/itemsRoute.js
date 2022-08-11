const express = require("express");
const ItemModel = require("../models/itemsModel");
const router = express.Router();

router.get("/get-all-items", async (req, res, next) => {
  try {
    
    if(req.body.session === req.sessionID)
    {
      const items = await ItemModel.find();
       res.status(200).send(items);
    }
    
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/add-item", async (req, res, next) => {
  try {
    const newItem = new ItemModel(req.body);
    await newItem.save();
    res.status(200).send('Item Added Successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/update-item", async (req, res, next) => {
  try {
    //const item = ItemModel(req.body);
    await ItemModel.findOneAndUpdate({_id: req.body.itemId}, req.body);

    res.status(200).send('Item Updated Successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete-item/:itemId", async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    //console.log(itemId);
    //console.log(req.body.itemId);
    await ItemModel.findOneAndDelete({_id: itemId});

    res.status(200).send('Item Deleted Successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
