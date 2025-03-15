import UserDAO from "../models/UserDAO.js";

const AuthController = {
  async registerUser(email, password, name, id) {
    try {
      await UserDAO.registerUser(email, password, name, id);
      return { success: true, message: "User registered successfully!" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  async loginUser(email, password) {
    try {
      const user = await UserDAO.loginUser(email, password);
      return { success: true, message: "Login successful!", user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

export default AuthController;
