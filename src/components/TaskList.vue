<template>
  <v-list flat subheader>
    <v-subheader>Tasks</v-subheader>
    <v-list-item-group>
      <v-list-item v-for="task in tasks" :key="task._id"
                   @click="complete">
        <v-list-item-content :class="task.complete ? 'complete' : 'notComplete'">
          <div class="row ma-1 d-flex align-content-center justify-center">
            <div class="col col-xs-12 col-sm-4" @click="complete(task)">
              <v-checkbox v-model="task.complete" :label="task.name" @click="complete(task)"
              ></v-checkbox></div>
            <div class="col col-xs-12 col-sm-3" @click="complete(task)"><span>{{task.description}}</span></div>
            <div class="col col-xs-12 col-sm-2" @click="complete(task)"><span>{{task.time}}</span></div>
            <div class="col col-xs-12 col-sm-2" @click="complete(task)"><span>{{task.formatDate()}}</span></div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import {db} from "@/config/firebase";
import TaskModel from "@/models/Task";

export default {
name: "TaskList",
  props: {
    item: {
      required: true,
    }
  },
  data(){
    return{
      tasks: [],
    }
  },
  firestore(){
  console.log(this.path);
    return{
      tasks: db.collection("users").doc(this.path[1])
          .collection("classes").doc(this.path[3])
          .collection('assignments').doc(this.path[5])
          .collection('tasks').withConverter(TaskModel),
    }
  },
  methods:{
    complete(task){
      task.complete = !task.complete;
      console.log(this.path);
      db.collection("users").doc(this.path[1])
          .collection("classes").doc(this.path[3])
          .collection('assignments').doc(this.path[5])
          .collection('tasks').doc(task._id).update({complete: task.complete})
          .then(() => {
            console.log("Success: Task " + task.name + " updated");
            this.item.updateRemainingTime();
          })
          .catch((error) => {
            console.error("Failed: Task " + task.name + " - " + error);
          })
    },
  },
  watch:{
    tasks: function(){
      this.item.tasks = this.tasks;
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
.notComplete /deep/ label, .notComplete div{
  color: black;
  text-decoration: none;
  text-align: center;
}
</style>