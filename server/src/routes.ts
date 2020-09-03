import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";
import AuthController from "./controllers/AuthController";
import UsersController from "./controllers/UsersController";
import verify from "./middlewares/verifyToken";

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();
const usersController = new UsersController();

routes.get("/users/:id", verify, usersController.show);

routes.get("/classes", verify, classesController.index);
routes.post("/classes", verify, classesController.create);

routes.post("/connections", verify, connectionsController.create);
routes.get("/connections", connectionsController.index);

routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post(
  "/send-reset-password-email/:email",
  authController.sendPasswordResetEmail
);
routes.post("/reset-password/:id/:token", authController.resetUserPassword);

export default routes;
