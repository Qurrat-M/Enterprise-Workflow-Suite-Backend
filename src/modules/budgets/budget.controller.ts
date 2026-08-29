import { Request, Response } from "express";

import { HTTP_STATUS } from "../../constants";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

import budgetService from "./budget.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    organizationId: string;
    email: string;
  };
}

class BudgetController {
  getBudgets = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.getAll(
      request.user.organizationId,
      req.query,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budgets fetched successfully", data));
  });

  getBudgetById = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.getById(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget fetched successfully", data));
  });

  createBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.create(
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Budget created successfully", data));
  });

  updateBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.update(
      req.params.id,
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget updated successfully", data));
  });

  deleteBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    await budgetService.delete(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget deleted successfully"));
  });

  /**
   * Submit budget
   */
  submitBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.submit(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget submitted successfully", data));
  });

  /**
   * Approve budget
   */
  approveBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.approve(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget approved successfully", data));
  });

  /**
   * Reject budget
   */
  rejectBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.reject(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget rejected successfully", data));
  });

  /**
   * Return budget
   */
  returnBudget = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await budgetService.returnBudget(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Budget returned successfully", data));
  });
}

export default new BudgetController();
