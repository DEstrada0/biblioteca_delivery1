<template>
  <div class="home-container">
    <div class="text-content">
      <h1>Welcome to the library Website</h1>
      <p>Please press get started to continue to login or Register if need it</p>
      <button @click="goToLogin">Get Started</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login'); // Redirects to login page
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  flex-direction: column;
}

.text-content {
  max-width: 600px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
