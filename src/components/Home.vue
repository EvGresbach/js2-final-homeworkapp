<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="8">
        <!-- Weclome message -->
        <h1>Welcome back <span v-if="authUser">, {{ authUser.displayName }}</span></h1>
        <p>Let's get back to work!</p>
      </v-col>
      <v-col sm="12" md="4">
        <!--  leaderboard overview  -->
          <h4>Today's Top Scores</h4>
          <div class="container">
          </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="4">
        <!--  Work Overview  -->
        <h4>Stuff to do</h4>
        <div class="container">

        </div>
      </v-col>
      <v-col sm="12" md="4">
        <!--  current badges  -->
        <h4>Achievements</h4>
        <div class="container">

        </div>
      </v-col>
      <v-col sm="12" md="4">
        <!--  recommended work  -->
        <h4>Recommended Work</h4>
        <div class="container">

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  props: {
    authUser: {
      required: true,
    }
  }

}
</script>

<style scoped>


</style>