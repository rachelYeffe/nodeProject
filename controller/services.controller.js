const { Router } = require('express');
const service = require('../service/service.service');
const {isAdminMiddleware}=require('../middleware/auth.middleware');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API for managing services
 */

/**
 * @swagger
 * /service:
 *   get:
 *     summary: Retrieve all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/',async (req, res) => {
    try {
        const services = await service.getAllService();
        res.send(services);
    } catch (error) {
        console.error(`Error in fetching services: ${error.message}`);
        res.status(500).send(`Error in fetching services: ${error.message}`);
    }
});

/**
 * @swagger
 * /service/{serviceId}:
 *   get:
 *     summary: Retrieve a single service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service
 *     responses:
 *       200:
 *         description: Service found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 */
router.get('/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const serviceData = await service.getService(serviceId);
        res.send(serviceData);
    } catch (error) {
        console.error(`Error in fetching service: ${error.message}`);
        res.status(500).send(`Error in fetching service: ${error.message}`);
    }
});

/**
 * @swagger
 * /service/{serviceId}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete('/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        await service.deleteService(serviceId);
        res.send("Service deleted successfully");
    } catch (error) {
        console.error(`Error in deleting service: ${error.message}`);
        res.status(500).send(`Error in deleting service: ${error.message}`);
    }
});

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 */
router.post('/',isAdminMiddleware, async (req, res) => {
    try {
        const newService = req.body;
        console.log("fff");
        const Myservice = await service.addService(newService);
        res.send(Myservice);
    } catch (error) {
        console.error(`Error in adding service: ${error.message}`);
        res.status(500).send(`Error in adding service: ${error.message}`);
    }
});

/**
 * @swagger
 * /service/{serviceId}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 */
router.put('/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const updatedService = req.body;
        console.log(serviceId+" "+updatedService);

        const Myservice = await service.updateService(serviceId, updatedService);
        res.send(Myservice);
    } catch (error) {
        console.error(`Error in updating service: ${error.message}`);
        res.status(500).send(`Error in updating service: ${error.message}`);
    }
});

module.exports = router;
