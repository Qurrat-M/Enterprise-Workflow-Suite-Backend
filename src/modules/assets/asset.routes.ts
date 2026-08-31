import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";

import assetController from "./asset.controller";

import {
  assetIdSchema,
  assetListQuerySchema,
  assignAssetSchema,
  createAssetSchema,
  transferAssetSchema,
  updateAssetSchema,
} from "./asset.schema";

const router = Router();

router.use(authenticate);

/**
 * GET /assets
 * Permission: asset.read
 */
router.get(
  "/",
  authorize("asset.read"),
  assetListQuerySchema,
  validateRequest,
  assetController.getAssets,
);

/**
 * GET /assets/:id
 * Permission: asset.read
 */
router.get(
  "/:id",
  authorize("asset.read"),
  assetIdSchema,
  validateRequest,
  assetController.getAssetById,
);

/**
 * POST /assets
 * Permission: asset.create
 */
router.post(
  "/",
  authorize("asset.create"),
  createAssetSchema,
  validateRequest,
  assetController.createAsset,
);

/**
 * PUT /assets/:id
 * Permission: asset.update
 */
router.put(
  "/:id",
  authorize("asset.update"),
  assetIdSchema,
  updateAssetSchema,
  validateRequest,
  assetController.updateAsset,
);

/**
 * DELETE /assets/:id
 * Permission: asset.delete
 */
router.delete(
  "/:id",
  authorize("asset.delete"),
  assetIdSchema,
  validateRequest,
  assetController.deleteAsset,
);

/**
 * PATCH /assets/:id/assign
 * Permission: asset.assign
 */
router.patch(
  "/:id/assign",
  authorize("asset.assign"),
  assetIdSchema,
  assignAssetSchema,
  validateRequest,
  assetController.assignAsset,
);

/**
 * PATCH /assets/:id/return
 * Permission: asset.return
 */
router.patch(
  "/:id/return",
  authorize("asset.return"),
  assetIdSchema,
  validateRequest,
  assetController.returnAsset,
);

/**
 * PATCH /assets/:id/transfer
 * Permission: asset.transfer
 */
router.patch(
  "/:id/transfer",
  authorize("asset.transfer"),
  assetIdSchema,
  transferAssetSchema,
  validateRequest,
  assetController.transferAsset,
);

/**
 * PATCH /assets/:id/dispose
 * Permission: asset.dispose
 */
router.patch(
  "/:id/dispose",
  authorize("asset.dispose"),
  assetIdSchema,
  validateRequest,
  assetController.disposeAsset,
);

export default router;
