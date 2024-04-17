import { AdminMapper } from '../../modules/admin/mapper/admin.mapper';
import { AdminService } from '../../modules/admin/services/admin.service';
import { RoleMapper } from '../../modules/role/mapper/role.mapper';
import { RoleService } from '../../modules/role/services/role.service';
import { SessionMapper } from '../../modules/session/mapper/session.mapper';
import { SessionService } from '../../modules/session/services/session.service';
import { UserMapper } from '../../modules/user/mapper/user.mapper';
import { UserService } from '../../modules/user/services/user.service';
import { BaseMapper } from '../mapper/base.mapper';
import { BaseService } from '../services/base.service';
import { MYSQL } from '../services/DB/mysql-connection.service';

const connectionDB = new MYSQL();

function createBaseMapper(): BaseMapper<any> {
  return new BaseMapper(connectionDB);
}

function createBaseService(): BaseService<any> {
  const baseMapper = createBaseMapper();
  return new BaseService(baseMapper);
}

// Factory function to create an instance of AdminMapper
function createAdminMapper(): AdminMapper {
  return new AdminMapper(connectionDB);
}

function createAdminService(): AdminService {
  const adminMapper = createAdminMapper();
  return new AdminService(adminMapper);
}

// Factory function to create an instance of UserMapper
function createUserMapper(): UserMapper {
  return new UserMapper(connectionDB);
}

function createUserService(): UserService {
  const userMapper = createUserMapper();
  return new UserService(userMapper);
}

// Factory function to create an instance of RoleMapper
function createRoleMapper(): RoleMapper {
  return new RoleMapper(connectionDB);
}

function createRoleService(): RoleService {
  const roleMapper = createRoleMapper();
  return new RoleService(roleMapper);
}

// Factory function to create an instance of SessionMapper
function createSessionMapper(): SessionMapper {
  return new SessionMapper(connectionDB);
}

function createSessionService(): SessionService {
  const sessionMapper = createSessionMapper();
  return new SessionService(sessionMapper);
}

// Export the created instances
const baseMapper = createBaseMapper();
const baseService = createBaseService();
const adminMapper = createAdminMapper();
const adminService = createAdminService();
const userMapper = createUserMapper();
const userService = createUserService();
// const roleMapper = createRoleMapper();
const roleService = createRoleService();
// const sessionMapper = createSessionMapper();
const sessionService = createSessionService();

export { baseMapper, baseService, adminMapper, adminService, userMapper, userService, connectionDB, roleService, sessionService };
