const userService = require('../service/login.service');
const User = require('../moudels/user.moudles');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock של פונקציות Mongoose
jest.mock('../moudels/user.moudles');

beforeAll(() => {
  process.env.TOKEN_SECRET =  "config.TOKEN_KEY" ;
});

test('signUp should create a new user and return the user object', async () => {
  User.findOne = jest.fn().mockResolvedValue(null); 

  User.prototype.save = jest.fn().mockResolvedValue({
    email: 'testuser@example.com',
    name: 'Test User',
    type: 'user',
  });

  const userData = {
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User',
  };

  const newUser = await userService.signUp(userData);
  expect(newUser).toHaveProperty('email', 'testuser@example.com');
  expect(newUser).toHaveProperty('name', 'Test User');
  expect(newUser).toHaveProperty('type', 'user');
});

test('signIn should return a token for valid user credentials', async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Mock של User.findOne
  User.findOne = jest.fn().mockResolvedValue({
    email: 'testuser@example.com',
    password: hashedPassword,
    type: 'user',
  });

  const token = await userService.signIn({
    email: 'testuser@example.com',
    password: 'password123',
  });

  expect(typeof token).toBe('string');
  expect(token).not.toBeNull();
});
