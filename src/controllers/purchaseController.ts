import express from "express"
import prisma from "../lib/prisma.ts";

export const createPurchase = async (
req, res
) => {
  try {
    const {
      shoppingListId,
      itemName,
      quantity,
      unitPrice,
      purchaseDate,
    } = req.body;

    const purchase =
      await prisma.purchase.create({
        data: {
          shoppingListId,
          itemName,
          quantity,
          unitPrice,
          totalPrice:
            quantity * unitPrice,
          purchaseDate:
            new Date(purchaseDate),
        },
      });

  return  res.status(201).json(purchase);
  } catch(err) {
    console.log(err)
    res.status(400).json({
      message: "Purchase creation failed",
    });
  }
};

export const getPurchases = async (
 req, res
) => {
  try {
    const purchases =
      await prisma.purchase.findMany({
        orderBy: {
          purchaseDate: "desc",
        },
      });

    res.json(purchases);
  } catch {
    res.status(400).json({
      message: "Failed to fetch purchases",
    });
  }
};

export const getPurchasesByList = async (
req, res
) => {
  try {
    const { shoppingListId } = req.params;

    const purchases =
      await prisma.purchase.findMany({
        where: {
          shoppingListId,
        },
      });

    res.json(purchases);
  } catch {
    res.status(400).json({
      message: "Failed to fetch purchases",
    });
  }
};

export const deletePurchase = async (
req, res
) => {
  try {
    const { id } = req.params;

    await prisma.purchase.delete({
      where: { id },
    });

    res.json({
      message: "Purchase deleted",
    });
  } catch {
    res.status(400).json({
      message: "Delete failed",
    });
  }
};