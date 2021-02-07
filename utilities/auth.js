const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `${process.env.OKTA}/oauth2/default`,
    clientId: process.env.CLIENT_ID,
});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
module.exports = {
    verifyToken,
    oktaJwtVerifier,
};
