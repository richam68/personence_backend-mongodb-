const mongoose = require("mongoose");

/**
 * Address Schema
 * @private
 */
const locationSchema = new mongoose.Schema(
    {
        //For Associatrion
        // clientId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Client',
        //   // required: true,
        // },
        organisation_id: {
            type: mongoose.Schema.Types.ObjectId
        },
        client_id: {
            type: String
        },
        add_line_1: {
            type: String,
        },
        add_line_2: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        },
        add_type: {
            type: String,
        },
        organisation_id: {
            type: String,
        },
        name: {
            type: String,
        },
        code: {
            type: String,
        },
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef location
 */
module.exports = mongoose.model("location", locationSchema);
