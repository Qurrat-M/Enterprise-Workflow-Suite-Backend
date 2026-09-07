import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";

import budgetRepository from "./budget.repository";

import {
  BudgetQuery,
  CreateBudgetInput,
  UpdateBudgetInput,
} from "./budget.types";

class BudgetService {
  async create(organizationId: string, data: CreateBudgetInput) {
    return budgetRepository.create(organizationId, data);
  }

  async getAll(organizationId: string, query: BudgetQuery) {
    return budgetRepository.findAll(organizationId, query);
  }

  async getById(id: string, organizationId: string) {
    const budget = await budgetRepository.findById(id, organizationId);

    if (!budget) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Budget not found");
    }

    return budget;
  }

  async update(id: string, organizationId: string, data: UpdateBudgetInput) {
    const budget = await this.getById(id, organizationId);

    if (budget.status !== "draft") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only draft budgets can be updated",
      );
    }

    return budgetRepository.update(id, organizationId, data);
  }

  async delete(id: string, organizationId: string) {
    const budget = await this.getById(id, organizationId);

    if (budget.status !== "draft") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only draft budgets can be deleted",
      );
    }

    await budgetRepository.delete(id, organizationId);
  }

  /**
   * Submit budget
   *
   * draft → pending
   */
  async submit(id: string, organizationId: string) {
    const budget = await this.getById(id, organizationId);

    if (budget.status !== "draft") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only draft budgets can be submitted",
      );
    }

    return budgetRepository.updateStatus(id, organizationId, "pending");
  }

  /**
   * Approve budget
   *
   * pending → approved
   */
  async approve(id: string, organizationId: string) {
    const budget = await this.getById(id, organizationId);

    if (budget.status !== "pending") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only pending budgets can be approved",
      );
    }

    return budgetRepository.updateStatus(id, organizationId, "approved");
  }

  /**
   * Reject budget
   *
   * pending → rejected
   */
  async reject(id: string, organizationId: string) {
    const budget = await this.getById(id, organizationId);

    if (budget.status !== "pending") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only pending budgets can be rejected",
      );
    }

    return budgetRepository.updateStatus(id, organizationId, "rejected");
  }

  /**
   * Return budget
   *
   * rejected → pending
   */
  async returnBudget(id: string, organizationId: string) {
    const budget = await this.getById(id, organizationId);

    if (budget.status !== "rejected") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only rejected budgets can be returned",
      );
    }

    return budgetRepository.updateStatus(id, organizationId, "pending");
  }
}

export default new BudgetService();
