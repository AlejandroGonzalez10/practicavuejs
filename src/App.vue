<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <nav>
      <ul>
        <li>
          <router-link to="/">Data</router-link>
        </li>
        <li>
          <router-link to="/add">New User</router-link>
        </li>
      </ul>
    </nav> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
