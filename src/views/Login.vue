<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" type="email" placeholder="Enter Email" />
    <input v-model="password" type="password" placeholder="Enter Password" />
    <button @click="loginUser">Login</button>
    <button @click="goToSignup">Signup</button>
    <p v-if="message" class="error">{{ message }}</p>
  </div>
</template>

<script>
import UserDAO from "../models/UserDAO"; 

export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    async loginUser() {
      this.message = "";
      
      if (!this.email || !this.password) {
        this.message = "Please enter both email and password.";
        return;
      }
      
      try {
        // Attempt to log in using UserDAO
        await UserDAO.loginUser(this.email.trim(), this.password);
        // On success, redirect to the dashboard
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        // Customize error messages based on error codes
        if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
          this.message = "Invalid email or password.";
        } else if (error.code === "auth/user-not-found") {
          this.message = "No user found with this email. Please sign up first.";
        } else {
          this.message = "Error logging in. Please try again.";
        }
      }
    },
    goToSignup() {
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
