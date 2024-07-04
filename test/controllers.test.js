// const userService = require('../service/login.service');
// const {deleteBusiness} = require('../service/bussiness.service');
// test('conection with admin token and options to access administrator functions ', () => {
//     const flag=deleteBusiness("");
//     expect(flag ).toBe(true);
  
// });

const { deleteBusiness } = require('../service/bussiness.service');
const jwt = require('jsonwebtoken');

// Mock של jwt.verify
jest.mock('jsonwebtoken');

// הגדרת משתני הסביבה
beforeAll(() => {
  process.env.TOKEN_SECRET = 'testsecret';
});

test('Admin token should allow deleting a business', async () => {
  jwt.verify.mockImplementation((token, secret) => {
    return {
      userType: 'admin',
      userEmail: 'admin@example.com'
    };
  });

  const result = await deleteBusiness("66847f4c53743d9bd51580f5");
  expect(result).toBe(true); 
});

test('User token should not allow deleting a business', async () => {
  jwt.verify.mockImplementation((token, secret) => {
    return {
      userType: 'user',
      userEmail: 'user@example.com'
    };
  });

  const result = await deleteBusiness("66847f4c53743d9bd51580f5");
  expect(result).toBe(false); 
});
