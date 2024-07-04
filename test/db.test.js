const mongoose = require('mongoose');
const connectDB = require('../DB/db');

beforeAll(() => {
  process.env.MONGO_URI = 'mongodb://localhost:27017/testdatabase';
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('Should connect to MongoDB and log the connection host', async () => {
  const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  await connectDB();
  expect(consoleLog).toHaveBeenCalledWith(expect.stringContaining('MongoDB Connected:'));
  consoleLog.mockRestore();
});
