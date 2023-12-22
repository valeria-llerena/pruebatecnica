import { Router, response } from "express";
import { methods as order_controller } from "../controllers/order_controller.js";

const router = Router();
router.get("/", order_controller.getOrders);
router.get("/:id", order_controller.getOrdersId);
router.put("/", order_controller.updateOrder);
router.post("/", order_controller.addOrder);
router.delete("/:idorder", order_controller.deleteOrder)
export default router;
