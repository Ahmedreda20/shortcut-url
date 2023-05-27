import { Router } from "express";
import UrlController from "../controllers/urls";

const router = Router();
const urlController = new UrlController();

router.get("/", (req, res, next) => res.render("index"));
router.get("/:code", urlController.Get);
router.post("/api/url/generate", urlController.Create);

export default router;
