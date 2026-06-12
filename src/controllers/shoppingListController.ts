import express from "express";
import prisma from "../lib/prisma.ts";

export const createShoppingList = async (
req, res
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
req, res
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
  } catch {
    res.status(400).json({
      message: "Failed to fetch lists",
    });
  }
};

export const getShoppingListById = async (
req, res
) => {
  try {
    const { id } = req.params;

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
  } catch {
    res.status(400).json({
      message: "Error retrieving list",
    });
  }
};

export const deleteShoppingList = async (
req, res
) => {
  try {
    const { id } = req.params;

    await prisma.shoppingList.delete({
      where: { id },
    });

    res.json({
      message: "List deleted",
    });
  } catch {
    res.status(400).json({
      message: "Delete failed",
    });
  }
};