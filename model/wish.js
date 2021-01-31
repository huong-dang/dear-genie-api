const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ERRORS } = require("../utilities/errors");

const WishSchema = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: [true, ERRORS.ACCOUNT_ID_REQUIRED],
        },
        url: {
            type: Schema.Types.String,
            default: "",
        },
        name: {
            type: Schema.Types.String,
            required: [true, ERRORS.WISH_NAME_REQUIRED],
        },
        description: {
            type: Schema.Types.String,
            default: "",
        },
        dateCreated: {
            type: Schema.Types.Date,
            required: true,
        },
        dateUpdated: {
            type: Schema.Types.Date,
            required: true,
        },
        purchased: {
            type: Schema.Types.Boolean,
            required: true,
            default: false,
        },
        purchasedDate: {
            type: Schema.Types.Date,
        },
    },
    { autoCreate: true }
);

module.exports = mongoose.model("Wish", WishSchema);
