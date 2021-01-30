const mongoose = require("mongoose");
const AccountModel = require("../../../model/account");
const ERRORS = require("../../../utilities/errors");

const user = {
    name: "Linh",
    email: "linh@linh.com",
    password: "testtest",
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
};

describe("Account model will", () => {
    beforeAll(async () => {
        await mongoose.connect(
            global.__MONGO_URI__,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            },
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        );
    });
    afterEach(async () => {
        await AccountModel.deleteMany({});
    });
    it("create and save a new account", async () => {
        fail("fail test");
        const account = new AccountModel(user);
        const result = await account.save();

        expect(result).toBeDefined();
        expect(result.name).toBe(user.name);
        expect(result.email).toBe(user.email);
        expect(result.password).not.toBe(user.password);
    });
    it("block another account from being created because email already exists in the system", async () => {
        const account1 = new AccountModel(user);
        await account1.save();

        try {
            const account2 = new AccountModel(user);
            await account2.save();
            fail("An error should've been thrown");
        } catch (err) {
            expect(err.errors["email"].message).toBe(
                ERRORS.EMAIL_EXISTS.replace(`{VALUE}`, user.email)
            );
        }
    });
    it("throw a validation error for a less than 8 characters long password", async () => {
        try {
            const userAccount = { ...user };
            userAccount.password = "test";
            const account = new AccountModel(userAccount);
            await account.save();
            fail("An error should've been thrown");
        } catch (err) {
            expect(err.errors["password"].message).toBe(ERRORS.PASSWORD_LENGTH);
        }
    });
    it("throw validation errors for an empty input", async () => {
        try {
            const account = new AccountModel({});
            await account.save();
            fail("An error should've been thrown");
        } catch (err) {
            expect(err.errors["password"].message).toBe(
                ERRORS.PASSWORD_REQUIRED
            );
            expect(err.errors["email"].message).toBe(ERRORS.EMAIL_REQUIRED);
            expect(err.errors["name"].message).toBe(ERRORS.NAME_REQUIRED);
            expect(err.errors["dateUpdated"].message).toBe(
                ERRORS.DATE_UPDATED_REQUIRED
            );
            expect(err.errors["dateCreated"].message).toBe(
                ERRORS.DATE_CREATED_REQUIRED
            );
        }
    });
    afterAll(() => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
    });
});
