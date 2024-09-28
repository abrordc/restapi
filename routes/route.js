import express from "express";
import Sheet from "../models/model.js";
import veriftoken from "../routes/verifToken.js";
const router = express.Router();

//crete
router.post("/", async (req, res) => {
  const userPost = new Sheet({
    nama: req.body.nama,
    alamat: req.body.alamat,
    email: req.body.email,
  });

  try {
    const data = await userPost.save();
    res.json({
      status: res.statusCode,
      message: "data has been created",
      data,
    });
  } catch (e) {
    res.json({ message: e });
  }
});

//read
router.get("/", veriftoken, async (req, res) => {
  try {
    const getData = await Sheet.find();
    res.json({
      status: res.statusCode,
      data: getData,
    });
  } catch (e) {
    res.json({ message: e });
  }
});

// update
router.put("/:userId", async (req, res) => {
  try {
    const updateUser = await Sheet.updateOne(
      { _id: req.params.userId },
      {
        nama: req.body.nama,
        alamat: req.body.alamat,
        email: req.body.email,
      }
    );
    res.json({
      status: res.statusCode,
      message: "data has been updated",
    });
  } catch (e) {
    res.json({ message: e });
  }
});

//delete
router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await Sheet.deleteOne({ _id: req.params.userId });
    res.json({
      status: res.statusCode,
      message: "data has been deleted",
    });
  } catch (e) {
    res.json({ message: e });
  }
});

export default router;
