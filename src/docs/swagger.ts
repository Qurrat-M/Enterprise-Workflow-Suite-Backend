import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Budget & Asset Management API",
      version: "1.0.0",
      description: "API Documentation",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/docs/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
