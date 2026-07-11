import { Request, Response } from "express";
import { db } from "../db";
import { nebula } from "../db/schema/nebula.schema";

export const createNebula = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    await db.insert(nebula).values({
      name,
    });

    return res.status(201).json({
      success: true,
      message: "Nebula created successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getNebulas = async (req: Request, res: Response) => {
  try {
    const nebulas = await db.select().from(nebula);

    return res.status(200).json({
      success: true,
      data: nebulas,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
