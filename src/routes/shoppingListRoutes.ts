import { Router } from "express";

import {
  createShoppingList,
  getShoppingLists,
  getShoppingListById,
  deleteShoppingList,
} from "../controllers/shoppingListController.ts";

const router = Router();

router.post("/", createShoppingList);

router.get("/", getShoppingLists);

router.get("/:id", getShoppingListById);

router.delete("/:id", deleteShoppingList);

export default router;