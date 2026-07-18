import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Budget & Asset Management API",
      version: "1.0.0",
      description: "API documentation for Budget & Asset Management Portal",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
    ],
  },

  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
