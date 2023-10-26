import bcrypt from 'bcryptjs';
import CartDAO from '../../models/daos/carts.dao.js';

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
    user.name = userRegisterData.name;
    user.lastname = userRegisterData.lastname;
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
      const cartCreationResult = await CartDAO.createCart();
      if (cartCreationResult.status === 200) {
        return cartCreationResult.payload._id
      } else {
        throw new Error('Failed to create a cart for the user.');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDTO()