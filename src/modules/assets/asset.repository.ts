import { db } from "../../config/db";

import {
  AssetQuery,
  CreateAssetInput,
  UpdateAssetInput,
  AssetStatus,
} from "./asset.types";

class AssetRepository {
  async create(organizationId: string, data: CreateAssetInput) {
    const { rows } = await db.query(
      `
      INSERT INTO assets (
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at;
      `,
      [
        organizationId,
        data.name,
        data.asset_code,
        data.category ?? null,
        data.description ?? null,
        data.purchase_date ?? null,
        data.purchase_cost ?? null,
      ],
    );

    return rows[0];
  }

  async findAll(organizationId: string, query: AssetQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;

    const sortMap: Record<string, string> = {
      name: "name",
      asset_code: "asset_code",
      category: "category",
      status: "status",
      created_at: "created_at",
      updated_at: "updated_at",
    };

    const sort = sortMap[query.sort ?? "created_at"];
    const order = query.order === "asc" ? "ASC" : "DESC";

    const values: unknown[] = [organizationId];
    let whereClause = "WHERE organization_id = $1";

    if (query.search) {
      values.push(`%${query.search}%`);

      whereClause += `
        AND (
          name ILIKE $${values.length}
          OR asset_code ILIKE $${values.length}
          OR category ILIKE $${values.length}
        )
      `;
    }

    const countResult = await db.query(
      `
      SELECT COUNT(*)::int AS total
      FROM assets
      ${whereClause};
      `,
      values,
    );

    const totalRecords = countResult.rows[0].total;

    values.push(limit);
    values.push(offset);

    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at
      FROM assets
      ${whereClause}
      ORDER BY ${sort} ${order}
      LIMIT $${values.length - 1}
      OFFSET $${values.length};
      `,
      values,
    );

    return {
      items: rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at
      FROM assets
      WHERE id = $1
        AND organization_id = $2
      LIMIT 1;
      `,
      [id, organizationId],
    );

    return rows[0] ?? null;
  }

  async update(id: string, organizationId: string, data: UpdateAssetInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.name !== undefined) {
      values.push(data.name);
      fields.push(`name = $${values.length}`);
    }

    if (data.asset_code !== undefined) {
      values.push(data.asset_code);
      fields.push(`asset_code = $${values.length}`);
    }

    if (data.category !== undefined) {
      values.push(data.category);
      fields.push(`category = $${values.length}`);
    }

    if (data.description !== undefined) {
      values.push(data.description);
      fields.push(`description = $${values.length}`);
    }

    if (data.purchase_date !== undefined) {
      values.push(data.purchase_date);
      fields.push(`purchase_date = $${values.length}`);
    }

    if (data.purchase_cost !== undefined) {
      values.push(data.purchase_cost);
      fields.push(`purchase_cost = $${values.length}`);
    }

    if (!fields.length) {
      return this.findById(id, organizationId);
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");

    values.push(id);
    values.push(organizationId);

    const { rows } = await db.query(
      `
      UPDATE assets
      SET ${fields.join(", ")}
      WHERE id = $${values.length - 1}
        AND organization_id = $${values.length}
      RETURNING
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at;
      `,
      values,
    );

    return rows[0] ?? null;
  }

  async delete(id: string, organizationId: string) {
    await db.query(
      `
      DELETE FROM assets
      WHERE id = $1
        AND organization_id = $2;
      `,
      [id, organizationId],
    );
  }

  async updateStatus(id: string, organizationId: string, status: AssetStatus) {
    const { rows } = await db.query(
      `
      UPDATE assets
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND organization_id = $3
      RETURNING
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at;
      `,
      [status, id, organizationId],
    );

    return rows[0] ?? null;
  }

  async assign(id: string, organizationId: string, userId: string) {
    const { rows } = await db.query(
      `
      UPDATE assets
      SET
        assigned_to = $1,
        status = 'assigned',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND organization_id = $3
      RETURNING
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at;
      `,
      [userId, id, organizationId],
    );

    return rows[0] ?? null;
  }

  async unassign(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      UPDATE assets
      SET
        assigned_to = NULL,
        status = 'available',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
        AND organization_id = $2
      RETURNING
        id,
        organization_id,
        name,
        asset_code,
        category,
        description,
        purchase_date,
        purchase_cost,
        status,
        assigned_to,
        created_at,
        updated_at;
      `,
      [id, organizationId],
    );

    return rows[0] ?? null;
  }
}

export default new AssetRepository();
