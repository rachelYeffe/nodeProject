const { Router } = require('express');
const meetingService = require('../service/meeting.service');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: API for managing meetings
 */

/**
 * @swagger
 * /meeting:
 *   get:
 *     summary: Retrieve all meetings
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: A list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 */
router.get('/', async (req, res) => {
    try {
        const allMeetings = await meetingService.getMeetings();
        res.send(allMeetings);
    } catch (error) {
        console.error(`Error in fetching meetings: ${error.message}`);
        res.status(500).send(`Error in fetching meetings: ${error.message}`);
    }
});

/**
 * @swagger
 * /meeting/{meetingId}:
 *   get:
 *     summary: Retrieve a single meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting
 *     responses:
 *       200:
 *         description: Meeting found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 */
router.get('/:meetingId', async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        const meetingData = await meetingService.getMeetingById(meetingId);
        res.send(meetingData);
    } catch (error) {
        console.error(`Error in fetching meeting: ${error.message}`);
        res.status(500).send(`Error in fetching meeting: ${error.message}`);
    }
});

/**
 * @swagger
 * /meeting/{meetingId}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       404:
 *         description: Meeting not found
 */
router.delete('/:meetingId', async (req, res) => {
    try {
        const meetingId = req.params.meetingId;
        await meetingService.deleteMeeting(meetingId);
        res.send("Meeting deleted successfully");
    } catch (error) {
        console.error(`Error in deleting meeting: ${error.message}`);
        res.status(500).send(`Error in deleting meeting: ${error.message}`);
    }
});

/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: Meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 */
router.post('/', async (req, res) => {
    try {
        const newMeeting = req.body;
        const createdMeeting = await meetingService.addMeeting(newMeeting);
        res.send(createdMeeting);
    } catch (error) {
        console.error(`Error in adding meeting: ${error.message}`);
        res.status(500).send(`Error in adding meeting: ${error.message}`);
    }
});

/**
 * @swagger
 * /meeting:
 *   put:
 *     summary: Update a meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 */
router.put('/', async (req, res) => {
    try {
        const updatedMeeting = req.body;
        const updatedData = await meetingService.updateMeeting(updatedMeeting);
        res.send(updatedData);
    } catch (error) {
        console.error(`Error in updating meeting: ${error.message}`);
        res.status(500).send(`Error in updating meeting: ${error.message}`);
    }
});

module.exports = router;
