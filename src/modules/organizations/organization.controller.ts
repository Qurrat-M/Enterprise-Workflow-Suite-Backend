import { Request, Response, NextFunction } from "express";

import organizationService from "./organization.service";

export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const organization = await organizationService.createOrganization(req.body);

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const organizations = await organizationService.getOrganizations(req.query);

    res.status(200).json({
      success: true,
      message: "Organizations retrieved successfully",
      data: organizations,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(error);
  }
};

export const updateOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(error);
  }
};

export const updateOrganizationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(error);
  }
};

export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await organizationService.deleteOrganization(req.params.id);

    res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    next(error);
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
