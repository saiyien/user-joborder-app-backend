const sinon = require('sinon');
const { expect } = require('chai');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose; // Import Mockgoose class
const ObjectId = mongoose.Types.ObjectId;

const userController = require('../src/controllers/userController');
const User = require('../src/models/userModel');
const config = require('../config');

describe('User Controller', () => {
    describe('createUser', async () => {
        it('should create a new user', async () => {
            const createUserStub = sinon.stub(User, 'create').resolves(
                { name: 'Test User', email: 'test@example.com' }
            );

            const req = { body: { name: 'Test User', email: 'test@example.com' } };
            const res = { json: (result) => result };

            const user = await userController.createUser(req, res);

            expect(user.name).to.equal('Test User');
            expect(user.email).to.equal('test@example.com');

            // Restore the stub after the test
            createUserStub.restore();
        });


        // Add more test cases as needed
    });   

    describe('updateUserWithJobOrder', () => {
        it('should update a user with a new job order', async () => {
            const userId = '64d73d7c552cec61add46af8';
            const jobOrder = {
                pickup: {
                    latitude: 22.335538,
                    longitude: 114.176169,
                    address: 'Kowloon Tong',
                },
                dropoff: {
                    latitude: 22.319181,
                    longitude: 114.170008,
                    address: 'Mong Kok',
                },
            };

            const findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate').resolves({
                _id: userId,
                jobOrders: [jobOrder],
            });

            const req = {
                params: { id: userId },
                body: { jobOrder },
            };
            const res = {
                json: (result) => result,
                status: (statusCode) => {
                    expect(statusCode).to.equal(200);
                    return res;
                },
            };

            const result = await userController.updateUserWithJobOrder(req, res);

            expect(result._id).to.equal(userId);
            expect(result.jobOrders).to.deep.equal([jobOrder]);
            expect(findByIdAndUpdateStub.calledOnce).to.be.true;

            findByIdAndUpdateStub.restore();
        });

    });

    const mockgoose = new Mockgoose(mongoose); // Create an instance of Mockgoose

    before(async () => {
        await mongoose.connect(config.databaseUrl, { useNewUrlParser: true }); // Connect to mock database
    });

    beforeEach(async () => {
        await mockgoose.helper.reset(); // Reset the database before each test
    });

    after(() => {
        mongoose.disconnect(); // Disconnect after all tests
    });

    describe('listUsersWithPagination', () => {
        it('should return a paginated list of users', async () => {
            // Insert mock data
            await User.create([
                { name: 'User 1', email: 'user1@example.com' },
                { name: 'User 2', email: 'user2@example.com' },
            ]);

            const req = { query: { page: 1, limit: 10 } };
            const res = {
                json: (result) => result,
                status: (statusCode) => {
                    expect(statusCode).to.equal(200);
                    return res;
                },
            };

            const users = await userController.listUsersWithPagination(req, res);

            expect(users).to.be.an('array');
            expect(users).to.have.lengthOf(2);
            expect(users[0].name).to.equal('User 1');
            expect(users[1].name).to.equal('User 2');

        });
    });
});