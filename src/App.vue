<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>

    <router-view /> <!-- This loads the current page -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
nav {
  background: #333;
  padding: 10px;
}
nav a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
</style>
