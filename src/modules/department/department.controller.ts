import { Request, Response } from "express";
import departmentService from "./department.service";

export const createDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizationId = req.user.organizationId;

    const department = await departmentService.createDepartment({
      ...req.body,
      organization_id: organizationId,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create department";

    if (message === "Department code already exists") {
      res.status(409).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const getDepartments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizationId = req.user.organizationId;

    const departments = await departmentService.getDepartments(
      organizationId,
      req.query,
    );

    res.status(200).json({
      success: true,
      message: "Departments retrieved successfully",
      data: departments,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve departments";

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizationId = req.user.organizationId;

    const department = await departmentService.getDepartmentById(
      organizationId,
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Department retrieved successfully",
      data: department,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to retrieve department";

    if (message === "Department not found") {
      res.status(404).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizationId = req.user.organizationId;

    const department = await departmentService.updateDepartment(
      organizationId,
      req.params.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update department";

    if (message === "Department not found") {
      res.status(404).json({
        success: false,
        message,
      });
      return;
    }

    if (message === "Department code already exists") {
      res.status(409).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const updateDepartmentStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizationId = req.user.organizationId;

    const department = await departmentService.updateDepartmentStatus(
      organizationId,
      req.params.id,
      req.body.status,
    );

    res.status(200).json({
      success: true,
      message: "Department status updated successfully",
      data: department,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update department status";

    if (message === "Department not found") {
      res.status(404).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizationId = req.user.organizationId;

    await departmentService.deleteDepartment(organizationId, req.params.id);

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete department";

    if (message === "Department not found") {
      res.status(404).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export default {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  updateDepartmentStatus,
  deleteDepartment,
};
