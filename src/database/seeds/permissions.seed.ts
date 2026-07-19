import { db } from "../../config/db";

const permissions = [
  // ===========================
  // USER
  // ===========================
  {
    module: "user",
    action: "create",
    name: "user.create",
    display_name: "Create User",
  },
  {
    module: "user",
    action: "read",
    name: "user.read",
    display_name: "View Users",
  },
  {
    module: "user",
    action: "update",
    name: "user.update",
    display_name: "Update User",
  },
  {
    module: "user",
    action: "delete",
    name: "user.delete",
    display_name: "Delete User",
  },

  // ===========================
  // ROLE
  // ===========================
  {
    module: "role",
    action: "create",
    name: "role.create",
    display_name: "Create Role",
  },
  {
    module: "role",
    action: "read",
    name: "role.read",
    display_name: "View Roles",
  },
  {
    module: "role",
    action: "update",
    name: "role.update",
    display_name: "Update Role",
  },
  {
    module: "role",
    action: "delete",
    name: "role.delete",
    display_name: "Delete Role",
  },

  // ===========================
  // PERMISSION
  // ===========================
  {
    module: "permission",
    action: "create",
    name: "permission.create",
    display_name: "Create Permission",
  },
  {
    module: "permission",
    action: "read",
    name: "permission.read",
    display_name: "View Permissions",
  },
  {
    module: "permission",
    action: "update",
    name: "permission.update",
    display_name: "Update Permission",
  },
  {
    module: "permission",
    action: "delete",
    name: "permission.delete",
    display_name: "Delete Permission",
  },

  // ===========================
  // WORKFLOW
  // ===========================
  {
    module: "workflow",
    action: "create",
    name: "workflow.create",
    display_name: "Create Workflow",
  },
  {
    module: "workflow",
    action: "read",
    name: "workflow.read",
    display_name: "View Workflows",
  },
  {
    module: "workflow",
    action: "update",
    name: "workflow.update",
    display_name: "Update Workflow",
  },
  {
    module: "workflow",
    action: "delete",
    name: "workflow.delete",
    display_name: "Delete Workflow",
  },
  {
    module: "workflow",
    action: "publish",
    name: "workflow.publish",
    display_name: "Publish Workflow",
  },
  {
    module: "workflow",
    action: "activate",
    name: "workflow.activate",
    display_name: "Activate Workflow",
  },
  {
    module: "workflow",
    action: "deactivate",
    name: "workflow.deactivate",
    display_name: "Deactivate Workflow",
  },
  {
    module: "workflow",
    action: "clone",
    name: "workflow.clone",
    display_name: "Clone Workflow",
  },
  {
    module: "workflow",
    action: "version",
    name: "workflow.version",
    display_name: "Manage Workflow Version",
  },
  {
    module: "workflow",
    action: "simulate",
    name: "workflow.simulate",
    display_name: "Simulate Workflow",
  },
  {
    module: "workflow",
    action: "approve",
    name: "workflow.approve",
    display_name: "Approve Workflow",
  },
  {
    module: "workflow",
    action: "reject",
    name: "workflow.reject",
    display_name: "Reject Workflow",
  },
  {
    module: "workflow",
    action: "return",
    name: "workflow.return",
    display_name: "Return Workflow",
  },
  {
    module: "workflow",
    action: "cancel",
    name: "workflow.cancel",
    display_name: "Cancel Workflow",
  },

  // ===========================
  // BUDGET
  // ===========================
  {
    module: "budget",
    action: "create",
    name: "budget.create",
    display_name: "Create Budget",
  },
  {
    module: "budget",
    action: "read",
    name: "budget.read",
    display_name: "View Budgets",
  },
  {
    module: "budget",
    action: "update",
    name: "budget.update",
    display_name: "Update Budget",
  },
  {
    module: "budget",
    action: "delete",
    name: "budget.delete",
    display_name: "Delete Budget",
  },
  {
    module: "budget",
    action: "submit",
    name: "budget.submit",
    display_name: "Submit Budget",
  },
  {
    module: "budget",
    action: "approve",
    name: "budget.approve",
    display_name: "Approve Budget",
  },
  {
    module: "budget",
    action: "reject",
    name: "budget.reject",
    display_name: "Reject Budget",
  },
  {
    module: "budget",
    action: "return",
    name: "budget.return",
    display_name: "Return Budget",
  },

  // ===========================
  // ASSET
  // ===========================
  {
    module: "asset",
    action: "create",
    name: "asset.create",
    display_name: "Create Asset",
  },
  {
    module: "asset",
    action: "read",
    name: "asset.read",
    display_name: "View Assets",
  },
  {
    module: "asset",
    action: "update",
    name: "asset.update",
    display_name: "Update Asset",
  },
  {
    module: "asset",
    action: "delete",
    name: "asset.delete",
    display_name: "Delete Asset",
  },
  {
    module: "asset",
    action: "assign",
    name: "asset.assign",
    display_name: "Assign Asset",
  },
  {
    module: "asset",
    action: "transfer",
    name: "asset.transfer",
    display_name: "Transfer Asset",
  },
  {
    module: "asset",
    action: "dispose",
    name: "asset.dispose",
    display_name: "Dispose Asset",
  },
  {
    module: "asset",
    action: "return",
    name: "asset.return",
    display_name: "Return Asset",
  },

  // ===========================
  // ATTACHMENT
  // ===========================
  {
    module: "attachment",
    action: "upload",
    name: "attachment.upload",
    display_name: "Upload Attachment",
  },
  {
    module: "attachment",
    action: "read",
    name: "attachment.read",
    display_name: "View Attachments",
  },
  {
    module: "attachment",
    action: "delete",
    name: "attachment.delete",
    display_name: "Delete Attachment",
  },

  // ===========================
  // NOTIFICATION
  // ===========================
  {
    module: "notification",
    action: "send",
    name: "notification.send",
    display_name: "Send Notification",
  },
  {
    module: "notification",
    action: "read",
    name: "notification.read",
    display_name: "View Notifications",
  },
  {
    module: "notification",
    action: "delete",
    name: "notification.delete",
    display_name: "Delete Notification",
  },

  // ===========================
  // DASHBOARD
  // ===========================
  {
    module: "dashboard",
    action: "read",
    name: "dashboard.read",
    display_name: "View Dashboard",
  },

  // ===========================
  // REPORT
  // ===========================
  {
    module: "report",
    action: "read",
    name: "report.read",
    display_name: "View Reports",
  },
  {
    module: "report",
    action: "export",
    name: "report.export",
    display_name: "Export Reports",
  },
];

export async function seedPermissions() {
  for (const permission of permissions) {
    await db.query(
      `
      INSERT INTO permissions (
        module,
        action,
        name,
        display_name
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name)
      DO UPDATE SET
        module = EXCLUDED.module,
        action = EXCLUDED.action,
        display_name = EXCLUDED.display_name
      `,
      [
        permission.module,
        permission.action,
        permission.name,
        permission.display_name,
      ],
    );
  }

  console.log("✅ Permissions seeded successfully");
}
