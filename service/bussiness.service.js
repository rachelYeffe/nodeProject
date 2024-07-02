const Business = require('../moudels/bussines.moudels');

const getBusinesses = async () => {
    try {
        const businesses = await Business.find();
        console.log('Businesses fetched from MongoDB');
        return businesses;
    } catch (error) {
        console.error(`Error in fetching businesses: ${error.message}`);
        throw error;
    }
};

const getBusinessById = async (businessId) => {
    try {
        const business = await Business.findById(businessId);
        if (!business) {
            throw new Error(`Business with ID ${businessId} not found`);
        }
        console.log('Business fetched from MongoDB');
        return business;
    } catch (error) {
        console.error(`Error in fetching business: ${error.message}`);
        throw error;
    }
};

const addBusiness = async (newBusiness) => {
    try {
        const business = new Business(newBusiness);
        const savedBusiness = await business.save();

        console.log("Business successfully added to MongoDB");
        return savedBusiness;
    } catch (error) {
        console.error(`Error in adding business: ${error.message}`);
        throw error;
    }
};

const deleteBusiness = async (businessId) => {
    try {
        const business = await Business.findByIdAndDelete(businessId);
        if (!business) {
            throw new Error(`Business with ID ${businessId} not found`);
        }
        console.log("Business successfully deleted from MongoDB");
        return business;
    } catch (error) {
        console.error(`Error in deleting business: ${error.message}`);
        throw error;
    }
};

const updateBusiness = async (updatedBusiness) => {
    try {
        const business = await Business.findByIdAndUpdate(updatedBusiness.id, updatedBusiness, { new: true });
        if (!business) {
            throw new Error(`Business with ID ${updatedBusiness.id} not found`);
        }
        console.log("Business successfully updated in MongoDB");
        return business;
    } catch (error) {
        console.error(`Error in updating business: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getBusinesses,
    getBusinessById,
    addBusiness,
    deleteBusiness,
    updateBusiness
};
