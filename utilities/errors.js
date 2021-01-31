const ERRORS = {
    PASSWORD_LENGTH: "Password must be at least 8 characters",
    PASSWORD_REQUIRED: "Password is required",
    ACCOUNT_NAME_REQUIRED: "Account name is required",
    EMAIL_REQUIRED: "Email is required",
    DATE_UPDATED_REQUIRED: "Date updated is required",
    DATE_CREATED_REQUIRED: "Date created is required",
    EMAIL_EXISTS: "{VALUE} already exists in our system",
    WISH_NAME_REQUIRED: "Wish name is required",
    ACCOUNT_ID_REQUIRED: "Account ID is required",
    WISH_ID_REQUIRED: "List of wish IDs is required",
};
const mongoose = require("mongoose");
function getMoongoseErrors(err) {
    errors = [];
    if (err instanceof mongoose.Error.ValidationError) {
        for (e in err.errors) {
            errors.push(err.errors[e].message);
        }
    } else {
        errors.push(err.message);
    }

    return errors;
}

module.exports = {
    ERRORS,
    getMoongoseErrors,
};
