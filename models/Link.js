const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    linkId: {
      type: String,
      required: true,
    },
    formName: {
      type: String,
      required: true,
    },
    formQuestion: [
      {
        question: {
          type: String,
          required: true,
        },
        option: {
          type: Array,
          required: true,
        },
        optionType: {
          type: String,
          required: true,
        },
      },
    ],
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
