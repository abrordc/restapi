import mongoose from "mongoose";

const SheetSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tgldaftar: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Sheet", SheetSchema);
