import { Request, Response } from "express";
import organizationService from "./organization.service";

export const createOrganization = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organization = await organizationService.createOrganization(req.body);

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organization,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create organization";

    if (message === "Organization code already exists") {
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

export const getOrganizations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organizations = await organizationService.getOrganizations(req.query);

    res.status(200).json({
      success: true,
      message: "Organizations retrieved successfully",
      data: organizations,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve organizations";

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const getOrganizationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organization = await organizationService.getOrganizationById(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Organization retrieved successfully",
      data: organization,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve organization";

    if (message === "Organization not found") {
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

export const updateOrganization = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organization = await organizationService.updateOrganization(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Organization updated successfully",
      data: organization,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update organization";

    if (message === "Organization not found") {
      res.status(404).json({
        success: false,
        message,
      });
      return;
    }

    if (message === "Organization code already exists") {
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

export const updateOrganizationStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const organization = await organizationService.updateOrganizationStatus(
      req.params.id,
      req.body.status,
    );

    res.status(200).json({
      success: true,
      message: "Organization status updated successfully",
      data: organization,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update organization status";

    if (message === "Organization not found") {
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

export const deleteOrganization = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await organizationService.deleteOrganization(req.params.id);

    res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete organization";

    if (message === "Organization not found") {
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
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  updateOrganizationStatus,
  deleteOrganization,
};
