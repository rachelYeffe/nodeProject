const { Router } = require('express');
const businessService = require('../service/bussiness.service');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: API for managing businesses
 */

/**
 * @swagger
 * /business/{businessId}:
 *   get:
 *     summary: Retrieve a single business by ID
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the business
 *     responses:
 *       200:
 *         description: Business found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 */
router.get('/:businessId', async (req, res) => {
    try {
        const businessId = req.params.businessId;
        const businessData = await businessService.getBusinessById(businessId);
        res.send(businessData);
    } catch (error) {
        console.error(`Error in fetching business: ${error.message}`);
        res.status(500).send(`Error in fetching business: ${error.message}`);
    }
});

/**
 * @swagger
 * /business:
 *   get:
 *     summary: Retrieve all businesses
 *     tags: [Businesses]
 *     responses:
 *       200:
 *         description: A list of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 */
router.get('/', async (req, res) => {
    try {
        const businesses = await businessService.getBusinesses();
        res.send(businesses);
    } catch (error) {
        console.error(`Error in fetching businesses: ${error.message}`);
        res.status(500).send(`Error in fetching businesses: ${error.message}`);
    }
});

/**
 * @swagger
 * /business/{businessId}:
 *   delete:
 *     summary: Delete a business by ID
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the business
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *       404:
 *         description: Business not found
 */
router.delete('/:businessId', async (req, res) => {
    try {
        const businessId = req.params.businessId;
        await businessService.deleteBusiness(businessId);
        res.send("Business deleted successfully");
    } catch (error) {
        console.error(`Error in deleting business: ${error.message}`);
        res.status(500).send(`Error in deleting business: ${error.message}`);
    }
});

/**
 * @swagger
 * /business:
 *   post:
 *     summary: Create a new business
 *     tags: [Businesses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */
router.post('/', async (req, res) => {
    try {
        const newBusiness = req.body;
        const createdBusiness = await businessService.addBusiness(newBusiness);
        res.send(createdBusiness);
    } catch (error) {
        console.error(`Error in adding business: ${error.message}`);
        res.status(500).send(`Error in adding business: ${error.message}`);
    }
});

/**
 * @swagger
 * /business:
 *   put:
 *     summary: Update a business by ID
 *     tags: [Businesses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Business updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 */
router.put('/', async (req, res) => {
    try {
        const updatedBusiness = req.body;
        const updatedData = await businessService.updateBusiness(updatedBusiness);
        res.send(updatedData);
    } catch (error) {
        console.error(`Error in updating business: ${error.message}`);
        res.status(500).send(`Error in updating business: ${error.message}`);
    }
});

module.exports = router;
