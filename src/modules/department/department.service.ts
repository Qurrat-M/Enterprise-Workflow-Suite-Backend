import departmentRepository from "./department.repository";
import {
  CreateDepartmentInput,
  DepartmentQuery,
  UpdateDepartmentInput,
} from "./department.types";

class DepartmentService {
  async createDepartment(data: CreateDepartmentInput) {
    const existingDepartment = await departmentRepository.findByCode(
      data.organization_id,
      data.code,
    );

    if (existingDepartment) {
      throw new Error("Department code already exists");
    }

    return departmentRepository.create(data);
  }

  async getDepartments(organizationId: string, query: DepartmentQuery) {
    return departmentRepository.findAll(organizationId, query);
  }

  async getDepartmentById(organizationId: string, id: string) {
    const department = await departmentRepository.findById(organizationId, id);

    if (!department) {
      throw new Error("Department not found");
    }

    return department;
  }

  async updateDepartment(
    organizationId: string,
    id: string,
    data: UpdateDepartmentInput,
  ) {
    const department = await departmentRepository.findById(organizationId, id);

    if (!department) {
      throw new Error("Department not found");
    }

    if (data.code !== undefined) {
      const existingDepartment = await departmentRepository.findByCode(
        organizationId,
        data.code,
      );

      if (existingDepartment && existingDepartment.id !== id) {
        throw new Error("Department code already exists");
      }
    }

    return departmentRepository.update(organizationId, id, data);
  }

  async updateDepartmentStatus(
    organizationId: string,
    id: string,
    status: "ACTIVE" | "INACTIVE",
  ) {
    const department = await departmentRepository.updateStatus(
      organizationId,
      id,
      status,
    );

    if (!department) {
      throw new Error("Department not found");
    }

    return department;
  }

  async deleteDepartment(organizationId: string, id: string) {
    const department = await departmentRepository.delete(organizationId, id);

    if (!department) {
      throw new Error("Department not found");
    }

    return department;
  }
}

export default new DepartmentService();
