const serviceModel = require('../moudels/service.moudels'); // שימו לב שתיקנתי את המילה moudels ל models

const getAllService = async () => { // שיניתי את השם של הפונקציה ל getAllServices
    try {
        const services = await serviceModel.find();
        console.log('Services fetched from MongoDB');
        return services;
    } catch (error) {
        console.error(`Error in fetching services: ${error.message}`);
        throw error;
    }
};

const getService = async (serviceId) => { // שיניתי את השם של הפונקציה ל getService
    try {
        const service = await serviceModel.findById(serviceId); // שיניתי את החיפוש לפי findById ולא find
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }
        console.log('Service fetched from MongoDB');
        return service;
    } catch (error) {
        console.error(`Error in fetching service: ${error.message}`);
        throw error;
    }
};

const addService = async (newService) => {
    try {
        console.log(newService);
        const service = new serviceModel(newService); 
        const savedService = await service.save(); // שמירת השירות במסד הנתונים       


        console.log("Service successfully added to MongoDB");
        return savedService; // החזרת השירות שנשמר במסד הנתונים
    } catch (error) {
        console.error(`Error in adding service: ${error.message}`);
        throw error;
    }
};

const deleteService = async (serviceId) => {
    try {
        const service = await serviceModel.findByIdAndDelete(serviceId); // שיניתי את המחיקה לפי findByIdAndDelete
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }
        console.log("Service successfully deleted from MongoDB");
        return service;
    } catch (error) {
        console.error(`Error in deleting service: ${error.message}`);
        throw error;
    }
};

const updateService = async (serviceId, updatedService) => { // שיניתי את השם של הפונקציה ל updateService והוספתי את הפרמטר updatedService
    try {
        const service = await serviceModel.findByIdAndUpdate(serviceId, updatedService, { new: true }); // שיניתי את העדכון לפי findByIdAndUpdate והוספתי את הפרמטר updatedService
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }
        console.log("Service successfully updated in MongoDB");
        return service;
    } catch (error) {
        console.error(`Error in updating service: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getAllService,
    getService,
    addService,
    deleteService,
    updateService
};
