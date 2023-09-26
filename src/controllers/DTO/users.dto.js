import bcrypt from 'bcrypt';
import cartsDao from '../../models/daos/carts.dao.js';

class UserDTO {
  constructor() {
    this.name = null;
    this.lastname = null;
    this.age = null;
    this.email = null;
    this.password = null;
    this.cartId = null;
    this.role = null
  }

  async createUser(userRegisterData) {
    const user = new UserDTO();
    user.first_name = userRegisterData.name;
    user.last_name = userRegisterData.lastname;
    user.age = userRegisterData.age;
    user.email = userRegisterData.email;
    user.password = await this.createHash(userRegisterData.password);
    user.cartId = await this.createCartForUser();
    user.role = userRegisterData.role
    return user;
  }

  async createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  async createCartForUser() {
    try {
      const cartCreationResult = await cartsDao.createCart();
      if (cartCreationResult.status === 200) {
        return cartCreationResult
      } else {
        throw new Error('Error al agregar el producto al carrito del usuario');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDTO()