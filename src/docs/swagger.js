const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.4",
        info: {
            title: "Tareas API",
            version: "1.0.0",
            description: "API para gestionar tareas",
        },
        servers: [
            {
                url: "http://https://tareas-express-con-bd.onrender.com/tasks"
            }
        ],
        components: {
            schemas: {
                Task: {
                    type: "object",
                    required: ["title"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID de la tarea",
                        },
                        title: {
                            type: "string",
                            description: "Título de la tarea",
                        },
                        description: {
                            type: "string",
                            description: "Descripción de la tarea",
                        },
                        completed: {
                            type: "boolean",
                            description: "Estado de la tarea",
                        },
                    } 
                }
            }
        }
    },
    apis: ["./src/routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options);
const setupSwaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs: http://https://tareas-express-con-bd.onrender.com/api-docs");
}

module.exports = setupSwaggerDocs;