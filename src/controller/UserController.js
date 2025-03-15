import UserDAO from '../services/UserDAO.js';

export default {
  async getUsers() {
    try {
      return await UserDAO.fetchAllUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }
};
