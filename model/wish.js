const mongoose = require("mongoose");
const { Schema } = mongoose;
autoCreate: true;
const wishSchema = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        url: String,
        name: {
            type: Schema.Types.String,
            required: true,
        },
        description: Schema.Types.String,
        dateUpdated: {
            type: Schema.Types.Date,
            required: true,
        },
    },
    { autoCreate: true }
);

module.exports = mongoose.model("Wish", wishSchema);
