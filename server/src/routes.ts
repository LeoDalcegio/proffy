import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";
import AuthController from "./controllers/AuthController";

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();

routes.get("/classes", classesController.index);
routes.post("/classes", classesController.create);

routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.create);

routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post(
  "/send-reset-password-email/:email",
  authController.sendPasswordResetEmail
);
routes.post("/reset-password/:id/:token", authController.resetUserPassword);

export default routes;
