import { Role } from '../../modules/role/domain/model/role';
import { RoleMapper } from '../../modules/role/mapper/role.mapper';
import { RoleService } from '../../modules/role/services/role.service';
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

// Export the created instances
const baseMapper = createBaseMapper();
const baseService = createBaseService();
const userMapper = createUserMapper();
const userService = createUserService();
const roleMapper = createRoleMapper();
const roleService = createRoleService();

export { baseMapper, baseService, userMapper, userService, connectionDB, roleService };
