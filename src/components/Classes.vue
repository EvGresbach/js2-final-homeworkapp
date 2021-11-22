<template>
  <div class="row">
    <!--  class list-->
    <div class="col sm-12 md-3">
      Your Classes

      <v-list>
        <!-- TODO: Click changes assignments/tests shown -->
        <v-list-item v-for="c in classes" :key="c" @click="currentClass = c">{{c.name}}</v-list-item>
      </v-list>
    </div>

    <!--  work for class-->
    <div class="col sm-12 md-9">
      <class :class="currentClass"></class>

      <!-- TODO: Fix colors on speed buttons; fix position-->
      <v-speed-dial v-model="fab" bottom right direction="left">
        <template v-slot:activator>
          <v-btn v-model="fab" color="secondary" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green" @click="addClassDialog = true">
          <v-icon>mdi-notebook</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo" @click="addAssignmentDialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-speed-dial>
      <!-- Add Class Modal-->
      <div class="text-center">
        <v-dialog v-model="addClassDialog" max-width="25%">
          <v-card>
            <v-container>
              <v-card-title>Add Class</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="newClassName" label="Class Name" required></v-text-field>
                </v-form>
              </v-card-text>
            </v-container>

            <v-card-actions>
              <v-btn color="primary" @click="addClass">Add Class</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!-- Add Assignment Modal -->
      <div class="text-center">
        <v-dialog v-model="addAssignmentDialog">
          <v-card>
            <v-card-title>Add Assignment</v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-btn color="primary">Add Class</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>

import Class from "@/models/Class";
import {db} from "@/config/firebase";

export default {
  name: "Classes",
  components:{
    Class,
  },

  props: {
    authUser: {
      required: true
    },
  },
  firebase: {

  },
  data() {
    return{
      fab: false,
      newClassName: '',
      currentClass: '',
      //modals
      addClassDialog: false,
      addAssignmentDialog: false,
    }
  },

  methods: {
    addClass(){

      db.collection(this.authUser.uid + '/classes').add({name: 'math'});
    }
  }
}
</script>

<style scoped>
div.row{
  min-height: 80%;
}
</style>