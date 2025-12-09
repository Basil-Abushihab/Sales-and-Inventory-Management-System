import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";

const router = Router();

router.get("/", InventoryController.getAll);
router.get("/:warehouseId/:productId", InventoryController.getOne);
router.post("/", InventoryController.create);
router.put("/:warehouseId/:productId", InventoryController.update);
router.delete("/:warehouseId/:productId", InventoryController.delete);

export default router;
