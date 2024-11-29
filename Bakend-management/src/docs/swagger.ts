import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API for managing tasks and user authentication",
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",  // Optional, indicates that the token is a JWT
                },
            },
        },
        security: [
            {
                BearerAuth: [], // This applies the BearerAuth security scheme globally
            },
        ],
        servers: [
            {
                url: "https://task-management-1-lecw.onrender.com/api", // Base URL of your API
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Paths to files with Swagger annotations
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
