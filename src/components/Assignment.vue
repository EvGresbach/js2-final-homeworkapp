<template>
  <div class="my-2">
    <v-row>
      <v-col xs="12">
        {{item.description}}
      </v-col>
    </v-row>
    <div v-for="task in item.tasks" :key="task._id" @click="complete(task)" :class="task.complete ? 'complete' : 'notComplete'">
      <v-row class="ma-1" align="center" justify="center">
        <v-col xs="12" sm="4">
          <v-checkbox v-model="task.complete" :label="task.name" @click="complete(task)" :class="task.complete ? 'complete' : 'notComplete'"></v-checkbox>
        </v-col>
        <v-col xs="12" sm="4"><span>{{task.description}}</span></v-col>
        <v-col xs="12" sm="2"><span>{{task.time}}</span></v-col>
        <v-col xs="12" sm="2"><span>{{task.formatDate()}}</span></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// import Assignment from "@/models/Assignment";

export default {
name: "Assignment",
  props: {
    item: {
      required: true,
    }
  },

  methods:{
    complete(task){
      task.toggleComplete();
    }
  }
}
</script>

<style scoped>
div.notComplete .row:hover, div.notComplete /deep/:hover{
  color: #0024ED;
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