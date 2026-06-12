import { Router } from "express";

import {
  createPurchase,
  getPurchases,
  getPurchasesByList,
  deletePurchase,
} from "../controllers/purchaseController.ts";

const router = Router();

router.post("/", createPurchase);

router.get("/", getPurchases);

router.get(
  "/list/:shoppingListId",
  getPurchasesByList
);

router.delete("/:id", deletePurchase);

export default router;