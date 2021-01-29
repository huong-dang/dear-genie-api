const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const AccountSchema = new Schema(
    {
        password: {
            type: Schema.Types.String,
            required: [true, "Password is required"],
            validate: {
                validator: (pass) => {
                    return pass && typeof pass === "string" && pass.length >= 8;
                },
                message: "Password must be at least 8 characters",
            },
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        dateCreated: {
            type: Schema.Types.Date,
            required: true,
        },
        dateUpdated: {
            type: Schema.Types.Date,
            required: true,
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email is required"],
            validate: {
                validator: (val) => {
                    return new Promise((resolve, reject) => {
                        const account = mongoose.model(
                            "Account",
                            AccountSchema
                        );
                        account
                            .findOne({ email: String(val) })
                            .then((res) => resolve(!res))
                            .catch((err) => reject(err));
                    });
                },
                message: "{VALUE} already exists in our system",
            },
        },
        verified: {
            type: Schema.Types.Boolean,
            default: false,
            required: true,
        },
    },
    { autoCreate: true }
);

AccountSchema.post("validate", (doc, next) => {
    try {
        doc.password = bcrypt.hashSync(doc.password, bcrypt.genSaltSync(8));
        next();
    } catch (e) {
        next(e);
    }
});

// checking if password is valid
AccountSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Account", AccountSchema);
