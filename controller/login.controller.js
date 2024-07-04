const { Router } = require('express');
const userService = require('../service/login.service');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *         
 *     responses:
 *       '200':
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.signIn({ email, password });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        console.error(`Error in signing in: ${error.message}`);
        res.status(500).send(`Error in signing in: ${error.message}`);
    }
});










/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Successful sign up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */
router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.signUp(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(`Error in signing up: ${error.message}`);
        res.status(500).send(`Error in signing up: ${error.message}`);
    }
});

module.exports = router;


