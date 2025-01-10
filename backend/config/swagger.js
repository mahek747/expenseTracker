const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Expense Management API',
        version: '1.0.0',
        description: 'API for managing expenses with filtering, sorting, and pagination.',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], 
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
