<template>
  <div>
    <v-list v-if="work.length > 0">
      <v-list-item v-for="item in work" :key="item._id">
        <work-item :item="item"></work-item>
      </v-list-item>
    </v-list>
    <div v-else>All assignments and tests complete!</div>
    <!-- Speed Dial -->
    <v-speed-dial
        v-model="fab"
        direction="top"
        bottom="bottom"
        right="right"
        transition="slide-y-reverse-transition"
        fixed open-on-hover dark
    >
      <template v-slot:activator>
        <v-btn
            v-model="fab"
            color="sdark" dark
            fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
        <v-btn fab small dark color="secondary"
               @click="addAssignmentDialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      <v-btn fab small dark color="slight" @click="addTestDialog = true">
        <v-icon>mdi-file</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- Add Assignment Modal -->
    <div class="text-center">
      <v-dialog v-model="addAssignmentDialog">
        <v-card>
          <!-- Use steppers to guide user through adding assignments -->
          <v-card-title class="justify-center text-h4">Add Assignment</v-card-title>
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
    <!-- Add Test Modal -->
    <div class="text-center">
      <v-dialog v-model="addTestDialog">
        <v-card>
          <!-- Use steppers to guide user through adding assignments -->
          <v-card-title class="justify-center text-h4">Add Test</v-card-title>
          <v-card-text>
            <!-- TODO: FORM -->
            <v-stepper v-model="slideControllerTest">
              <v-stepper-header>
                <v-stepper-step :complete="slideControllerTest > 1" step="1">Get Test Information</v-stepper-step>
                <v-divider/>
                <v-stepper-step :complete="slideControllerTest > 2" step="2">Review Your Test</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <!-- Use separate forms for the required stuff  -->
                <v-stepper-content step="1">
                  <v-form @submit.prevent="pgValidation1">
                    <v-card flat tile>
                      <!-- Title, description, due date, class-->
                      <div class="row">
                        <div class="col col-xs-12 col-sm-6">
                          <v-text-field v-model="newTest.name" label="Assignment Name"
                                        :rules="nameRules" required></v-text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-10">
                          <v-textarea v-model="newTest.description" label="Description"></v-textarea>
                        </div>
                        <div class="col col-xs-12 col-sm-2">
                          <v-text-field v-model="newTest.time" label="Estimated Time"></v-text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-6">
                          <v-text-field v-model="newTest.dueDate" label="Due Date"></v-text-field>
                        </div>
                        <div class="col col-xs-12 col-sm-6">
                          <v-date-picker v-model="newTest.dueDate" label="Due Date Picker" show-current
                                         required></v-date-picker>
                        </div>
                      </div>
                    </v-card>
                    <v-btn @click="slideControllerTest++">Next</v-btn>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card flat tile>
                    <v-card-title>{{newTest.name}}</v-card-title>
                    <v-card-text>
                      <div>Class: {{userClass.name}}</div>
                      <div>Assignment Description: {{newTest.description}}</div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-4">
                          Estimated Time: {{newTest.time}}
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-btn @click="slideControllerTest--">Back</v-btn>
                  <v-btn @click="addTest">Finish</v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import {db} from "@/config/firebase";
import WorkItem from "@/components/WorkItem";
import Assignment from "@/models/Assignment";
import AssignmentModel from "@/models/Assignment";
import Task from "@/models/Task";
import Test from "@/models/Test";
import TestModel from "@/models/Test";

export default {
name: "WorkList",
  props: {
    authUser: {required: true,},
    userClass: {required: true,},

    //menu
    showDeleted: {
      required: true,
      type: Boolean,
    },
    showCompleted: {
      required: true,
      type: Boolean,
    },
  },
  components: {
    WorkItem,
  },

  data(){
    return{
      fab: false,

      //Dialogs
      addTestDialog: false,
      addAssignmentDialog: false,
      addTaskDialog: false,
      slideController: 1,
      slideControllerTest: 1,

      //new work
      newTest: new Test(),
      newAssignment: new Assignment(),
      newSubTask: new Task(),

      //rules
      nameRules: [v => !!v || "Please name your assignment"],
      classRules: [
        v=> !!v || "Please pick a class",
      ],

      assignments: [],
      tests: [],
    }
  },

  firestore(){
    return {
      assignments: db.collection("users").doc(this.authUser.uid)
          .collection("classes").doc(this.userClass._id)
          .collection('assignments').withConverter(AssignmentModel),
      tests: db.collection("users").doc(this.authUser.uid)
          .collection("classes").doc(this.userClass._id)
          .collection('tests').withConverter(TestModel),
    }
  },

  methods: {
    addTask() {
      this.addTaskDialog = false;
      this.newAssignment.tasks.push(this.newSubTask);
      this.newAssignment.updateTime();
      this.newSubTask = new Task();
    },

    addAssignment() {
      //add assignment to db
      db.collection("users").doc(this.authUser.uid)
          .collection("classes").doc(this.userClass._id)
          .collection('assignments').add(this.newAssignment.toFirestore())
          .then((docRef) => {
            console.log("Success: Assignment " + this.newAssignment.name + " added");
            for (let i = 0; i < this.newAssignment.tasks.length; i++) {
              db.collection("users").doc(this.authUser.uid)
                  .collection("classes").doc(this.userClass._id)
                  .collection('work').doc(docRef.id)
                  .collection("tasks").add(this.newAssignment.tasks[i])
                  .then(() =>{console.log("Success: Task " + this.newAssignment.tasks[i].name + " added")})
                  .catch((error) =>{console.error("Error: ", error)} )
            }
            this.addAssignmentDialog = false;
          })
          .catch((error) => {
            console.error(error)
          });
    },

    addTest(){
      db.collection("users").doc(this.authUser.uid)
          .collection("classes").doc(this.userClass._id)
          .collection('tests').add(this.newTest.toFirestore())
          .then(() => {
            console.log("Success: Test " + this.newTest.name + " added");
            this.addTestDialog = false;
            this.newTest = new Test();
          })
          .catch((error) => {
            console.error(error)
          });
    },
    test(){
      console.log(this.assignments);
      console.log(this.tests);
    }
  },

  computed: {
    work: function (){
      let arr = [];
      if(this.showCompleted){
        if(this.showDeleted)
          //show completed and deleted items
          arr = this.assignments.concat(this.tests)
        else
          //show completed but not deleted
          arr = this.assignments.concat(this.tests).filter(task => !task.deleted)
      } else{
        if(this.showDeleted)
            //dont show completed but show deleted items
          arr = this.assignments.concat(this.tests).filter(task => !task.complete)
        else
            //dont show completed and dont show deleted items
          arr = this.assignments.concat(this.tests).filter(task => !task.complete && !task.deleted)
      }
      return arr.sort((a, b)=>{return a.dueDate - b.dueDate;});
    }
  }
}
</script>

<style scoped>
</style>