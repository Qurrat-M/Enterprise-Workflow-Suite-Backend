import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";

import assetRepository from "./asset.repository";

import {
  AssetQuery,
  AssetStatus,
  CreateAssetInput,
  UpdateAssetInput,
} from "./asset.types";

class AssetService {
  async create(organizationId: string, data: CreateAssetInput) {
    return assetRepository.create(organizationId, data);
  }

  async getAll(organizationId: string, query: AssetQuery) {
    return assetRepository.findAll(organizationId, query);
  }

  async getById(id: string, organizationId: string) {
    const asset = await assetRepository.findById(id, organizationId);

    if (!asset) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Asset not found");
    }

    return asset;
  }

  async update(id: string, organizationId: string, data: UpdateAssetInput) {
    await this.getById(id, organizationId);

    const asset = await assetRepository.update(id, organizationId, data);

    return asset;
  }

  async delete(id: string, organizationId: string) {
    const asset = await this.getById(id, organizationId);

    if (asset.status === "assigned") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Assigned assets cannot be deleted",
      );
    }

    await assetRepository.delete(id, organizationId);
  }

  async assign(id: string, organizationId: string, userId: string) {
    const asset = await this.getById(id, organizationId);

    if (asset.status !== "available") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only available assets can be assigned",
      );
    }

    return assetRepository.assign(id, organizationId, userId);
  }

  async returnAsset(id: string, organizationId: string) {
    const asset = await this.getById(id, organizationId);

    if (asset.status !== "assigned") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only assigned assets can be returned",
      );
    }

    return assetRepository.unassign(id, organizationId);
  }

  async transfer(id: string, organizationId: string, userId: string) {
    const asset = await this.getById(id, organizationId);

    if (asset.status !== "assigned") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only assigned assets can be transferred",
      );
    }

    return assetRepository.assign(id, organizationId, userId);
  }

  async dispose(id: string, organizationId: string) {
    const asset = await this.getById(id, organizationId);

    if (asset.status === "disposed") {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Asset is already disposed");
    }

    return assetRepository.updateStatus(id, organizationId, "disposed");
  }
}

export default new AssetService();
