const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const ERRORS = require("../utilities/errors");

const AccountSchema = new Schema(
    {
        password: {
            type: Schema.Types.String,
            required: [true, ERRORS.PASSWORD_REQUIRED],
            validate: {
                validator: (pass) => {
                    return pass && typeof pass === "string" && pass.length >= 8;
                },
                message: ERRORS.PASSWORD_LENGTH,
            },
        },
        name: {
            type: Schema.Types.String,
            required: [true, ERRORS.NAME_REQUIRED],
        },
        dateCreated: {
            type: Schema.Types.Date,
            required: [true, ERRORS.DATE_CREATED_REQUIRED],
        },
        dateUpdated: {
            type: Schema.Types.Date,
            required: [true, ERRORS.DATE_UPDATED_REQUIRED],
        },
        email: {
            type: Schema.Types.String,
            required: [true, ERRORS.EMAIL_REQUIRED],
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
                message: ERRORS.EMAIL_EXISTS,
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

AccountSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(String(password), this.password);
};

module.exports = mongoose.model("Account", AccountSchema);
