import { Request, Response } from "express";
import { analyzeQuestion } from "../services/ai.service";

export const analyze = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const result = await analyzeQuestion({
      question,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("AI Controller Error:", error.message);

    return res.status(503).json({
      success: false,
      message: "AI service is currently unavailable",
    });
  }
};
