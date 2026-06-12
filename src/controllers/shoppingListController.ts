import express from "express";
import type {Response, Request} from "express"
import prisma from "../lib/prisma.ts";

export const createShoppingList = async (
req: Request, res: Response
) => {
  try {
    const { name } = req.body;

    const list = await prisma.shoppingList.create({
      data: {
        name,
      },
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create list",
    });
  }
};

export const getShoppingLists = async (
req: Request, res: Response
) => {
  try {
    const lists = await prisma.shoppingList.findMany({
      include: {
        purchases: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(lists);
  } catch (error) {
 console.error("getShoppingLists error:", error);
 
  res.status(400).json({
    message: "Failed to fetch lists",
    error,
  });
}
};

export const getShoppingListById = async (
req: Request, res: Response
) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") { return res.status(400).json({ message: "shoppingListId is required" }); }

    const list = await prisma.shoppingList.findUnique({
      where: { id },
      include: {
        purchases: true,
      },
    });

    if (!list) {
      return res
        .status(404)
        .json({ message: "List not found" });
    }

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(400).json({
    message: "Error retrieving list",
    error,
    });
  }
};

export const deleteShoppingList = async (
req: Request, res: Response
) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") { return res.status(400).json({ message: "shoppingListId is required" }); }

    await prisma.shoppingList.delete({
      where: { id },
    });

    res.json({
      message: "List deleted",
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Delete failed",
      error,
    });
  }
};