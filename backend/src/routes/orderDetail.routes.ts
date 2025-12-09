import { Router } from "express";
import { OrderDetailController } from "../controllers/orderDetail.controller";

const router = Router();

router.get("/", OrderDetailController.getAll);
router.get("/:orderId/:productId", OrderDetailController.getOne);
router.post("/", OrderDetailController.create);
router.put("/:orderId/:productId", OrderDetailController.update);
router.delete("/:orderId/:productId", OrderDetailController.delete);

export default router;
