import { body, param, query } from "express-validator";

export const assetIdSchema = [
  param("id").isUUID().withMessage("Invalid asset UUID"),
];

export const assetListQuerySchema = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search").optional().isString().withMessage("Search must be a string"),

  query("sort")
    .optional()
    .isIn([
      "name",
      "asset_code",
      "category",
      "status",
      "created_at",
      "updated_at",
    ])
    .withMessage("Invalid sort field"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];

export const createAssetSchema = [
  body("name").trim().notEmpty().withMessage("Asset name is required"),

  body("asset_code").trim().notEmpty().withMessage("Asset code is required"),

  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string"),

  body("purchase_date")
    .optional()
    .isISO8601()
    .withMessage("Purchase date must be a valid date"),

  body("purchase_cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase cost must be a non-negative number"),
];

export const updateAssetSchema = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Asset name cannot be empty"),

  body("asset_code")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Asset code cannot be empty"),

  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string"),

  body("purchase_date")
    .optional()
    .isISO8601()
    .withMessage("Purchase date must be a valid date"),

  body("purchase_cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase cost must be a non-negative number"),
];

export const assignAssetSchema = [
  body("userId").isUUID().withMessage("Invalid user UUID"),
];

export const transferAssetSchema = [
  body("userId").isUUID().withMessage("Invalid user UUID"),
];
