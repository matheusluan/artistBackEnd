import { Router } from "express";
import {ensureAuthentication} from "./middlewares/authentication.handler";
import categoriesController from "./controllers/categories.controller";
import userController from "./controllers/user.controller";
import addressController from "./controllers/address.controller";
import ratingController from "./controllers/rating.controller";
import eventController from "./controllers/event.controller";
import postController from "./controllers/post.controller";
import candidaturasController from "./controllers/candidaturas.controller";

import multer from "multer";
import { multerConfiguration } from "./configuration/multer.configuration";

const router = Router();

router.get("/", (_request, response) => {
  const { name, version } = require("../package.json");
  return response.json({
    name,
    version,
  });
});

//Category
router.post("/categories", categoriesController.create);
router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

//Login
router.post("/login", userController.login);

//User
router.post("/user", userController.create);
router.post("/user_categories", userController.updateCategories);
router.get("/user", userController.findAll);
router.get("/user/:id", userController.findById);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

//Foto
router.post("/foto", multer(multerConfiguration).array("foto"), userController.updateImg);

//Event
router.post("/event", eventController.create);
router.get("/events/:id", eventController.findAll);
router.get("/event/:id", eventController.findById);
router.put("/event/:id", eventController.update);
router.put("/eventCategories/:id", eventController.deleteCategories);
router.delete("/event/:id", eventController.delete);


//Post
router.post("/post", multer(multerConfiguration).array("assets"), postController.create);
router.put("/post/:id", multer(multerConfiguration).array("assets"), postController.update);


router.get("/post", postController.findAll);
router.get("/post/:id", postController.findById);
router.get("/posts/:id", postController.findByUser);
router.delete("/post/:id", postController.delete);


//Address
router.post("/address", addressController.create);
router.get("/address/:id", addressController.findById);
router.put("/address/:id", addressController.update);
router.delete("/address/:id", addressController.delete);

//Rating
router.post("/rating", ratingController.create); 

//Candidaturas
router.post("/candidatura", candidaturasController.create);
router.get("/candidatura/artist/:id", candidaturasController.findByUser);
router.get("/candidatura/event/:id", candidaturasController.findByEvent);
router.put("/candidatura/:id", candidaturasController.update);
router.delete("/candidatura/:id", candidaturasController.delete);


export { router };
