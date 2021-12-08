<template>
  <div class="my-2">
    <v-row>
      <v-col xs="12">
        {{item.description}}
      </v-col>
    </v-row>
    <div v-for="task in tasks" :key="task._id" :class="task.complete ? 'complete' : 'notComplete'">
      <v-row class="ma-1" align="center" justify="center">
        <v-col xs="12" sm="4" @click="complete(task)">
          <v-checkbox v-model="task.complete" :label="task.name" @click="complete(task)"
                      class="notComplete'"
                      :readonly="item.complete"
          ></v-checkbox>
        </v-col>
        <v-col xs="12" sm="3" @click="complete(task)"><span>{{task.description}}</span></v-col>
        <v-col xs="12" sm="2" @click="complete(task)"><span>{{task.time}}</span></v-col>
        <v-col xs="12" sm="2" @click="complete(task)"><span>{{task.formatDate()}}</span></v-col>
        <v-col xs="12" sm="1"><v-btn small text @click="openDialog(task)" v-if="!task.complete"><v-icon>mdi-pencil</v-icon></v-btn></v-col>
      </v-row>
    </div>
    <!-- Edit Task Dialog  -->
    <div class="text-center">
      <v-dialog v-model="editTaskDialog" max-width="50%">
        <v-card>
          <v-card-title>Edit Task</v-card-title>
          <v-card-text>
            <!-- Title, description, due date, class-->
            <v-text-field v-model="taskToEdit.name" label="Task Name" required></v-text-field>
            <v-text-field v-model="taskToEdit.description" label="Description"></v-text-field>
            <v-date-picker v-model="taskToEdit.dueDate" label="Due Date" required></v-date-picker>
            <v-text-field v-model="taskToEdit.time" label="Estimated Time"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="editTask">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import {db} from "@/config/firebase";
import TaskModel from  "@/models/Task";
import Task from  "@/models/Task";

export default {
name: "Assignment",
  props: {
    item: {
      required: true,
    }
  },
  data(){
    return{
      editTaskDialog: false,
      taskToEdit: new Task(),
      tasks: [],
    }
  },
  firestore(){
    return{
      tasks: db.collection("users").doc(this.path[1])
          .collection("classes").doc(this.path[3])
          .collection('assignments').doc(this.path[5])
          .collection('tasks').withConverter(TaskModel),
    }
  },
  methods:{
    complete(task){
      task.toggleComplete();
      db.collection("users").doc(this.path[1])
          .collection("classes").doc(this.path[3])
          .collection('assignments').doc(this.path[5])
          .collection('tasks').doc(task._id).update({complete: task.complete})
          .then(() => {
            console.log("Success: Task " + task.name + " updated");
            this.item.updateRemainingTime(this.tasks);
          })
          .catch((error) => {
            console.error("Failed: Task " + task.name + " - " + error);
          })
    },
    openDialog(task){
      this.taskToEdit = task;
      this.editTaskDialog = true;
    },
    editTask(){
      db.collection("users").doc(this.path[1])
          .collection("classes").doc(this.path[3])
          .collection('assignments').doc(this.path[5])
          .collection('tasks').doc(this.taskToEdit._id)
          .update({
            name: this.taskToEdit.name,
            description: this.taskToEdit.description,
            time: this.taskToEdit.time,
            date: this.taskToEdit.dueDate
          })
          .then(() => {
            console.log("Success: Task " + this.taskToEdit.name + " updated");
            this.item.updateTime(this.tasks);
            this.item.updateRemainingTime();
            this.editTaskDialog = false;
            this.taskToEdit = new Task();
            this.$emit('update');
          })
          .catch((error) => {
            console.error("Failed: Task " + this.taskToEdit.name + " - " + error);
          })
    }
  },
  computed: {
    path(){
      return this.item._path.split('/');
    }
  },
}
</script>

<style scoped>
div.notComplete div.row:hover, div.notComplete div.row:hover .v-btn, div.notComplete div.row:hover div.v-input /deep/ label.v-label {
  color: #EDCA00;
  cursor: pointer;
  transition: none;
}

.complete /deep/ label, .complete{
  color: lightgrey;
  text-align: center;
  vertical-align: center;
}
.notComplete /deep/ label, .notComplete{
  color: black;
  text-decoration: none;
  text-align: center;
}

</style>