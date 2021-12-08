<template>
  <div>
    <v-list>
      <v-list-item v-for="item in work" :key="item._id" three-line>
        <v-list-item-content>
          <v-list-item-title>{{item.name}}</v-list-item-title>
          <v-list-item-subtitle>Time Left: {{item.remainingTime}}</v-list-item-subtitle>
          <v-list-item-subtitle :class="item.dueDate < today ? 'red--text' : ''">Due Date: {{item.formatDate()}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="secondary" @click="$emit('add-to-my-day', item)"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div>No Current Work for {{currentClass.name}}</div>
  </div>

</template>

<script>
import {db} from "@/config/firebase";
import AssignmentModel from "@/models/Assignment";
import TestModel from "@/models/Test";

export default {
name: "SimpleWorkItem",
  props: {
    currentClass: {required: true},
  },
  data(){
    return{
      assignments: [],
      tests: [],
    }
  },
  firestore(){
    let path = this.currentClass._path.split('/');
    return{
      assignments: db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3]) //class
          .collection('assignments').withConverter(AssignmentModel),
      tests: db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3]) //class
          .collection('tests').withConverter(TestModel),
    }
  },
  computed: {
    work: function(){
      //get all assignments and tests that are not completed or deleted and sort by due date
      let arr = this.assignments.concat(this.tests).filter(work => !work.complete && !work.deleted);
      return arr.sort((a, b)=>{return a.dueDate - b.dueDate;});
    },
    today(){
      let today = new Date();
      var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
      var MM = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
      var yyyy = today.getFullYear();
      today = yyyy + '-' + MM + '-' + dd;
      return today;
    },
  }
}
</script>

<style scoped>

</style>