const request = require('supertest');
const app = require('../server');
const { connect, disconnect } = require("../utils/db");
const User = require('../models/user_schema');
const jwt = require('jsonwebtoken');
let token;
let folderId;


// this hook is form jest
beforeAll(async () => {
    await connect();
    let user = await User.findOne({
        email: "forTesting@email.com"
    });

    // retrieving the token
    token = jwt.sign({
        email: user.email,
        name: user.name,
        _id: user._id
    }, process.env.APP_KEY);

});
afterAll(async () => {
    await disconnect();
});

describe('Get all folders', () => {
    it('should retrieve an array of folders', async () => {

        // this is when supertest is used
        const res = await request(app).get('/api/folder');
        folderId = res.body[1]._id;

        // toEqual and toHaveLength is jest. Google these for the specific things you want
        expect(res.statusCode).toEqual(200);
    });
});