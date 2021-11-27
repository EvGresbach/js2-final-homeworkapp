<template>
  <div class="row">
    <!--  class list-->
    <div class="col col-xs-12 col-sm-3">
      <v-navigation-drawer permanent height="100%" width="100%">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Your Classes
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item v-for="c in classes" :key="c._id" @click="currentClass = c">{{c.name}}</v-list-item>
        </v-list>

        <v-spacer/>
        <v-divider/>
        <v-btn color="secondary" @click="addClassDialog = true">Add Class</v-btn>
      </v-navigation-drawer>
    </div>

    <!--  work for class-->
    <div class="col col-xs-12 col-sm-9">
      <class :user-class="currentClass"></class>

      <!-- Dialogs -->
      <!-- Add Class Modal-->
      <div class="text-center">
        <v-dialog v-model="addClassDialog" max-width="40%">
          <v-card>
            <v-container>
              <v-card-title>Add Class</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="newClass.name" label="Class Name" required></v-text-field>
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
        <v-dialog v-model="addAssignmentDialog" >
          <v-card>
            <!-- Use steppers to guide user through adding assignments -->
            <v-card-text>
            <!-- TODO: FORM -->
              <v-stepper v-model="slideController">
                <v-stepper-header>
                  <v-stepper-step :complete="slideController > 1" step="1">Get the Basics</v-stepper-step>
                  <v-divider/>
                  <v-stepper-step :complete="slideController > 2" step="2">Break It Down</v-stepper-step>
                  <v-divider/>
                  <v-stepper-step :complete="slideController > 3" step="3">Review Your Assignment</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <!-- Use separate forms for the required stuff  -->
                  <v-stepper-content step="1">
                    <v-form>
                      <v-card flat tile>
                        <!-- Title, description, due date, class-->
                        <v-text-field v-model="newTask.name" label="Assignment Name" required></v-text-field>
                        <v-text-field v-model="newTask.description" label="Description"></v-text-field>
                        <v-date-picker v-model="newTask.dueDate" label="Due Date" required></v-date-picker>
                        <v-select :items="classes" item-text="name" label="Class"></v-select>
                      </v-card>
                      <v-btn @click="slideController++">Next</v-btn>
                    </v-form>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card flat tile>You again?</v-card>
                    <v-btn @click="slideController--">Back</v-btn>
                    <v-btn @click="slideController++">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-content step="3">
                    <v-card flat tile>I guess it works!</v-card>
                    <v-btn @click="slideController--">Back</v-btn>
                    <v-btn >Finish</v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <!-- FAB -->
      <!-- TODO: Fix colors on speed buttons; fix position-->
      <v-tooltip top>
        <template v-slot:activator="{on, attrs}">
          <v-btn fab bottom right color="secondary"
                 v-bind="attrs"
                 v-on="on"
                 @click="addAssignmentDialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add Assignment</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>

import {db} from "@/config/firebase";
import Class from "@/components/Class";
import UserClass from "../models/UserClass"
import UserClassModel from "../models/UserClass";
// import Assignment from "@/models/Assignment";
import Task from "@/models/Task";

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

  data() {
    return{
      fab: false,
      newClass: new UserClass(),
      currentClass: {name: ''},
      //modals
      addClassDialog: false,
      addAssignmentDialog: false,
      slideController: 1,

      classes: [],

      //new assignment
      newTask: new Task(),

    }
  },

  firestore() {
    return {
      classes: db.collection('users').doc(this.authUser.uid)
          .collection(UserClassModel.collectionName).withConverter(UserClassModel),
    }
  } ,

  methods: {
    addClass(){
      db.collection('users').doc(this.authUser.uid).collection('classes')
          .add(this.newClass.toFirestore());
      console.log("??");
      this.newClass = new UserClass();
      this.addClassDialog = false;
    },

  },


}
</script>

<style scoped>
div.row{
  min-height: 100%;
}
</style>
