<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="8">
        <!-- Welcome message -->
        <h1>Welcome back<span v-if="authUser">, {{ authUser.displayName }}</span></h1>
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
    <!-- TODO: ADD BADGES -->
<!--    <v-btn @click="addBadges">Add</v-btn>-->
  </v-container>
</template>

<script>

export default {
  name: "Home",
  props: {
    authUser: {
      required: true,
    }
  },
  methods: {
    // addBadges(){
    //   let arr = [
    //     {minRequirement: "1", type: "Assignment", message: "Complete 1 Assignment", badgeKey: "Complete x"},
    //     {minRequirement: "5", type: "Assignment", message: "Complete 5 Assignments", badgeKey: "Complete x"},
    //     {minRequirement: "10", type: "Assignment", message: "Complete 10 Assignments", badgeKey: "Complete x"},
    //     {minRequirement: "25", type: "Assignment", message: "Complete 25Assignments", badgeKey: "Complete x"},
    //     {minRequirement: "50", type: "Assignment", message: "Complete 50 Assignments", badgeKey: "Complete x"},
    //     {minRequirement: "100", type: "Assignment", message: "Complete 100 Assignments", badgeKey: "Complete x"},
    //     {minRequirement: "1", type: "Test", message: "Complete 1 Test", badgeKey: "Complete x"},
    //     {minRequirement: "5", type: "Test", message: "Complete 5 Tests", badgeKey: "Complete x"},
    //     {minRequirement: "10", type: "Test", message: "Complete 10 Tests", badgeKey: "Complete x"},
    //     {minRequirement: "25", type: "Test", message: "Complete 25 Tests", badgeKey: "Complete x"},
    //     {minRequirement: "50", type: "Test", message: "Complete 50 Tests", badgeKey: "Complete x"},
    //     {minRequirement: "100", type: "Test", message: "Complete 100 Tests", badgeKey: "Complete x"},
    //     {minRequirement: "10", type: "Assignment", message: "Have an Assignment Over 10 Minutes", badgeKey: "Over time,"},
    //     {minRequirement: "30", type: "Assignment", message: "Have an Assignment Over 30 Minutes"},
    //     {minRequirement: "60", type: "Assignment", message: "Have an Assignment Over 60 Minutes"},
    //     {minRequirement: "90", type: "Assignment", message: "Have an Assignment Over 90 Minutes"},
    //     {minRequirement: "120", type: "Assignment", message: "Have an Assignment Over 120 Minutes"},
    //     {minRequirement: "180", type: "Assignment", message: "Have an Assignment Over 180 Minutes"},
    //     {minRequirement: "10", type: "Test", message: "Have an Test Over 10 Minutes"},
    //     {minRequirement: "30", type: "Test", message: "Have an Test Over 30 Minutes"},
    //     {minRequirement: "60", type: "Test", message: "Have an Test Over 60 Minutes"},
    //     {minRequirement: "90", type: "Test", message: "Have an Test Over 90 Minutes"},
    //     {minRequirement: "120", type: "Test", message: "Have an Test Over 120 Minutes"},
    //     {minRequirement: "180", type: "Test", message: "Have an Test Over 180 Minutes"},
    //
    //   ]
    // }
  }
}
</script>

<style scoped>


</style>