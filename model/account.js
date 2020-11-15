const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema(
    {
        username: {
            type: Schema.Types.String,
            required: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        name: {
            type: Schema.Types.String,
            required: true,
        },
        dateCreated: {
            type: Schema.Types.Date,
            required: true,
        },
        dateUpdated: {
            type: Schema.Types.Date,
            required: true,
        },
    },
    { autoCreate: true }
);

module.exports = mongoose.model("Account", accountSchema);
