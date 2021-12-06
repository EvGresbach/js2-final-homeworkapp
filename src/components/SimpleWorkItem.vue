<template>
  <div>
    <v-card outlined width="100%">
      <v-card-title>
        <div class="row">
          <div class="col col-xs-12 col-sm-6">{{item.name}}</div>
          <div class="col col-xs-12 col-sm-3">
            {{item.remainingTime}}/{{item.time}}
          </div>
          <div class="col col-xs-12 col-sm-3">
            <span :class="item.dueDate < today ? 'red--text' : ''">{{item.formatDate()}}</span>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        Description: {{item.description}}
        <task-list :item="item"></task-list>

      </v-card-text>
      <v-card-actions>
        <v-btn class="black--text" color="primary" @click="complete">Complete</v-btn>
        <v-btn @click="$emit('remove', item)">Remove From My Day</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {db} from "@/config/firebase";
import TaskList from "@/components/TaskList";

export default {
name: "SimpleWorkIte",
  props: {
    item: {
      required: true,
    }
  },
  components:{
    TaskList,
  },
  methods: {
    complete(){
      this.item.toggleComplete();
      var path = this.item._path.split('/');

      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3])//class
          .collection(path[4]).doc(path[5])//assignment
          .update({complete: this.item.complete})
          .then(() => {
            console.log("Success!");
            this.$emit('remove', this.item)
          })
          .catch((error) => {console.error("Update failed: ", error)})
    },
  },
  computed: {
    itemType(){
      return this.item.constructor.name;
    },
    today(){
      let today = new Date();
      var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
      var MM = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
      var yyyy = today.getFullYear();
      today = yyyy + '-' + MM + '-' + dd;
      console.log(this.item.dueDate)
      console.log(today);
      return today;
    }
  }
}
</script>

<style scoped>

</style>