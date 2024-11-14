import { Router } from "express";
import { contactUsController } from "../controllers/contactUs.controller.js";

const contactUsRouter = Router();
contactUsRouter.post("/contact", contactUsController);

export { contactUsRouter };
