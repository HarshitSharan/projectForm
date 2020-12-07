const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
    { 
        linkId: {
            type: string,
            required: true,
        },
        linkJson: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
)

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;