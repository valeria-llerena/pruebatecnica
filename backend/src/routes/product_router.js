import { Router, response } from "express";
import { methods as product_controller } from "../controllers/product_controller.js";

const router = Router();
router.get("/:idorder", product_controller.getProductsbyId);
router.delete("/:idorder", product_controller.deleteProducts);
router.post("/", product_controller.addProducts);
export default router;
