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

// Export the created instances
const baseMapper = createBaseMapper();
const baseService = createBaseService();
const userMapper = createUserMapper();
const userService = createUserService();

export { baseMapper, baseService, userMapper, userService, connectionDB };
