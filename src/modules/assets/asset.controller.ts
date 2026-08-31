import { Request, Response } from "express";

import { HTTP_STATUS } from "../../constants";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

import assetService from "./asset.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    organizationId: string;
    email: string;
  };
}

class AssetController {
  getAssets = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.getAll(
      request.user.organizationId,
      req.query,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Assets fetched successfully", data));
  });

  getAssetById = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.getById(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset fetched successfully", data));
  });

  createAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.create(
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Asset created successfully", data));
  });

  updateAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.update(
      req.params.id,
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset updated successfully", data));
  });

  deleteAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    await assetService.delete(req.params.id, request.user.organizationId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset deleted successfully"));
  });

  assignAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.assign(
      req.params.id,
      request.user.organizationId,
      req.body.userId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset assigned successfully", data));
  });

  returnAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.returnAsset(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset returned successfully", data));
  });

  transferAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.transfer(
      req.params.id,
      request.user.organizationId,
      req.body.userId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset transferred successfully", data));
  });

  disposeAsset = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await assetService.dispose(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Asset disposed successfully", data));
  });
}

export default new AssetController();
