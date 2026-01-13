const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["traffic", "pothole"],
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "resolved"],
            default: "pending",
        },

        image: {
            type: String,
        },

        location: {
            area: String,
            latitude: Number,
            longitude: Number
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
