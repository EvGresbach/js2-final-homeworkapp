<template>
  <div>
    <div class="row mt-1">
      <div class="col col-xs-12 col-sm-8">
        <h2>{{userClass.name}}</h2>
      </div>
      <div class="col col-xs-12 col-sm-4">
        <v-menu v-model="menu" open-on-hover offset-y>
          <template v-slot:activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on">Change Showing</v-btn>
          </template>
          <v-container>
            <v-checkbox v-model="showDeleted" label="Show Deleted"></v-checkbox>
            <v-checkbox v-model="showCompleted" label="Show Complete"></v-checkbox>
          </v-container>
        </v-menu>
      </div>
    </div>
    <work-list :authUser="authUser"
               :userClass="userClass"
               :showDeleted="showDeleted"
               :showCompleted="showCompleted"
    ></work-list>
  </div>
</template>

<script>
import WorkList from "@/components/WorkList";

export default {
  name: "Class",
  components:{
    WorkList,
  },
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
      //menu
      menu: false,
      showDeleted: false,
      showCompleted: false,
    }
  }
}
</script>

<style scoped>
div.container{background-color: white;}
</style>