import mongoose from "mongoose";

const toneSchema = new mongoose.Schema({
  toneCode: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tones: [toneSchema],
});

const Color = mongoose.model('Color', colorSchema);

export default Color;

