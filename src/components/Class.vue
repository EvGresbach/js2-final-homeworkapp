<template>
  <div>
    <h2>{{userClass.name}}</h2>
    <v-list></v-list>

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
                  <v-form @submit.prevent="pgValidation1">
                    <v-card flat tile>
                      <!-- Title, description, due date, class-->
                      <div class="row">
                        <div class="col col-xs-12 col-sm-6">
                          <v-text-field v-model="newAssignment.name" label="Assignment Name"
                                        :rules="nameRules" required></v-text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col col-12">
                          <v-textarea v-model="newAssignment.description" label="Description"></v-textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-6">
                          <v-text-field v-model="newAssignment.dueDate" label="Due Date"></v-text-field>
                        </div>
                        <div class="col col-xs-12 col-sm-6">
                          <v-date-picker v-model="newAssignment.dueDate" label="Due Date Picker" show-current
                                         required></v-date-picker>
                        </div>
                      </div>
                    </v-card>
                    <v-btn @click="slideController++">Next</v-btn>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-form>
                    <v-card flat tile>
                      <!-- This is where they should be adding subtasks or estimating the time -->
                      <v-text-field v-model="newAssignment.time" label="Estimated Time"></v-text-field>
                      <v-list>
                        <v-list-item v-for="task in newAssignment.tasks" :key="task.name">{{task.name}}</v-list-item>
                      </v-list>
                      <v-btn @click="addTaskDialog = true">Add Task</v-btn>
                    </v-card>
                    <v-btn @click="slideController--">Back</v-btn>
                    <v-btn @click="slideController++">Next</v-btn>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-card flat tile>
                    <v-card-title>{{newAssignment.name}}</v-card-title>
                    <v-card-text>
                      <div>Class: {{userClass.name}}</div>
                      <div>Assignment Description: {{newAssignment.description}}</div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-8">
                          <v-list>
                            <v-list-item v-for="task in newAssignment.tasks" :key="task.name">{{task.name}} - {{task.time}}</v-list-item>
                          </v-list>
                        </div>
                        <div class="col col-xs-12 col-sm-4">
                          Estimated Time: {{newAssignment.time}}
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-btn @click="slideController--">Back</v-btn>
                  <v-btn @click="addAssignment">Finish</v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <!-- Add Subtask Modal -->
    <div class="text-center">
      <v-dialog v-model="addTaskDialog" max-width="50%">
        <v-card>
          <v-card-title>Add Task</v-card-title>
          <v-card-text>
            <!-- Title, description, due date, class-->
            <v-text-field v-model="newSubTask.name" label="Task Name" required></v-text-field>
            <v-text-field v-model="newSubTask.description" label="Description"></v-text-field>
            <v-date-picker v-model="newSubTask.dueDate" label="Due Date" required></v-date-picker>
            <v-text-field v-model="newSubTask.time" label="Estimated Time"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addTask">Add Task to Assignment</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-btn @click="test">Testing</v-btn>
  </div>
</template>

<script>


import Assignment from "@/models/Assignment";
import Task from "@/models/Task";
import {db} from "@/config/firebase";
import AssignmentModel from "@/models/Assignment";


export default {
  name: "Class",
  props: {
    authUser: {
      required: true,
    },
    userClass: {
      type: Object,
      required: true,
    },
  },

  data(){
    return{
      fab: false,

      //Dialogs
      addAssignmentDialog: false,
      addTaskDialog: false,
      slideController: 1,

      //new assignment
      newAssignment: new Assignment(),
      newSubTask: new Task(),

      //rules
      nameRules: [v => !!v || "Please name your assignment"],
      classRules: [
        v=> !!v || "Please pick a class",
      ],

      work: [],
    }
  },

  firestore(){
    console.log(this.userClass.name);
    return {
      work: db.collection("users").doc(this.authUser.uid)
          .collection("classes").doc(this.userClass._id)
          .collection('work').withConverter(AssignmentModel),
    }
  },

  methods:{
    addTask(){
      this.addTaskDialog = false;
      this.newAssignment.tasks.push(this.newSubTask);
      this.newAssignment.updateTime();
      this.newSubTask = new Task();
    },

    addAssignment(){
      //add assignment to db
      db.collection("users").doc(this.authUser.uid)
          .collection("classes").doc(this.userClass._id)
          .collection('work').add(this.newAssignment.toFirestore())
          .then(() => {
            console.log("Success: Assignment " + this.newAssignment.name + " added");
            this.addAssignmentDialog = false;
            // return docRef.id;
          })
      //     .then((id) => {
      //       for(var i = 0; i < this.newAssignment.tasks.length; i++){
      //         console.log(id);
      //         db.collection("users").doc(this.authUser.uid)
      //             .collection("classes").doc(this.userClass._id)
      //             .collection('work').doc(id)
      //             .collection('tasks').add(this.newAssignment.tasks[i].toFirestore())
      //             .then((docRef) =>{
      //               console.log("Success: Task " + docRef.path + " added");
      //             }).catch((error) => {
      //               console.error(error);
      //             });
      // }})
          .catch((error) => {console.error(error)});
      //add tasks to db


      },
    test(){
      for (let i = 0; i < this.work.length; i++) {
        console.log(this.work[i]);
      }
    }

    },
}
</script>

<style scoped>

</style>