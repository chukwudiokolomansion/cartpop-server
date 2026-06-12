import express from "express";
import cors from "cors";

import shoppingListRoutes
  from "./routes/shoppingListRoutes.ts";

import purchaseRoutes
  from "./routes/purchaseRoutes.ts";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/shopping-lists",
  shoppingListRoutes
);

app.use(
  "/api/purchases",
  purchaseRoutes
);


app.listen(process.env.PORT, () => {
  console.log("Server up and running")
})
export default app;