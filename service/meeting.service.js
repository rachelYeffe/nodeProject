const Meeting = require('../moudels/meeting.moudles'); // החלפתי את שם המודל למודל הנכון

const getMeetings = async () => {
    try {
        const meetings = await Meeting.find();
        console.log('Meetings fetched from MongoDB');
        return meetings;
    } catch (error) {
        console.error(`Error in fetching meetings: ${error.message}`);
        throw error;
    }
};

const getMeeting = async (meetingId) => {
    try {
        const meeting = await Meeting.findById(meetingId);
        if (!meeting) {
            throw new Error(`Meeting with ID ${meetingId} not found`);
        }
        console.log('Meeting fetched from MongoDB');
        return meeting;
    } catch (error) {
        console.error(`Error in fetching meeting: ${error.message}`);
        throw error;
    }
};

const addMeeting = async (newMeeting) => {
    try {
        const meeting = new Meeting(newMeeting);
        const savedMeeting = await meeting.save();

        console.log("Meeting successfully added to MongoDB");
        return savedMeeting;
    } catch (error) {
        console.error(`Error in adding meeting: ${error.message}`);
        throw error;
    }
};

const deleteMeeting = async (meetingId) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(meetingId);
        if (!meeting) {
            throw new Error(`Meeting with ID ${meetingId} not found`);
        }
        console.log("Meeting successfully deleted from MongoDB");
        return meeting;
    } catch (error) {
        console.error(`Error in deleting meeting: ${error.message}`);
        throw error;
    }
};

const updateMeeting = async (updatedMeeting) => {
    try {
        const { _id, ...rest } = updatedMeeting; // פרצתי את העדכון
        const meeting = await Meeting.findByIdAndUpdate(_id, rest, { new: true });
        if (!meeting) {
            throw new Error(`Meeting with ID ${_id} not found`);
        }
        console.log("Meeting successfully updated in MongoDB");
        return meeting;
    } catch (error) {
        console.error(`Error in updating meeting: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getMeetings,
    getMeeting,
    addMeeting,
    deleteMeeting,
    updateMeeting
};
