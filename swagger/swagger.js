const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger API Documentation',
            version: '1.0.0',
            description: 'Documentation for API endpoints',
        },
        components: {
            schemas: {
                Service: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        // וכן הלאה
                    },
                },
                Business: {
                    type: 'object',
                    properties: {
                        ID: { type: 'string' },
                        Description: { type: 'string' },
                    },
                },
                Meeting: {
                    type: 'object',
                    properties: {
                        Description: { type: 'string' },
                    },
                },
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        sale: { type: 'boolean' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        password: { type: 'string', required: true },
                        email: { type: 'string', required: true },
                        name: { type: 'string', required: true },
                        type: { type: 'string', required: true },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./controller/*.js'], // מיקום הקבצים שבהם מוגדרים המסלולים של ה-API שלך
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
