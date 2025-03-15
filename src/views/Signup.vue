<template>
  <div class="signup-container">
    <h1>Signup</h1>
    <p>Welcome, user!</p>
    <p>Please fill in all the data to create an account. Thank you.</p>

    <input v-model="name" type="text" placeholder="Enter your name" required />
    <input v-model="id" type="text" placeholder="Enter your ID" required />
    <input v-model="email" type="email" placeholder="Enter your Email" required />
    <input v-model="password" type="password" placeholder="Choose a Password" required />

    <button @click="signup">Signup</button>
    <button @click="goback">Go back</button>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import AuthController from "../controller/AuthController.js";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      id: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    goback() {
      this.$router.push("/login");
    },
    async signup() {
      try {
        const response = await AuthController.registerUser(
          this.email,
          this.password,
          this.name,
          this.id
        );
        this.message = response.message;

        if (response.success) {
          this.$router.push("/dashboard"); // Redirect to dashboard if successful
        }
      } catch (error) {
        this.message = "Error: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
}
button {
  margin: 5px;
}
</style>
