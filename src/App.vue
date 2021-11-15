<template>
  <div id="app">
    <v-card mt-0>
      <!-- Navigation -->
      <v-toolbar  color="#EDCA00">
        <v-toolbar-title>Homework App</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/home"> Home </router-link> |
        <router-link to="/classes"> Classes </router-link> |
        <router-link to="/my-day"> My Day </router-link> |
        <router-link to="/achievements"> Achievements </router-link> |
        <router-link to="/leaderboard"> Leaderboard </router-link> |
        <router-link to="/profile"> Profile </router-link>
      </v-toolbar>
      <!-- Page -->
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
