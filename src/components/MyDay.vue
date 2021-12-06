<template>
  <div class="row">
    <!--  class list-->
    <div class="col col-xs-12 col-sm-3">
      <v-navigation-drawer permanent height="100%" width="100%">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{"Your Classes"}}
              </v-list-item-title>
              <v-divider/>
              <v-menu offset-y>
                <template v-slot:activator="{on, attrs}">
                  <v-btn v-bind="attrs" v-on="on">{{currentClass.name ? currentClass.name : 'Select Class'}}</v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="item in classes" :key="item._id" @click="currentClass = item">
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer/>
        <v-divider/>
        <simple-work-list @add-to-my-day="addToMyDay" v-if="currentClass.name !== null" :currentClass="currentClass"></simple-work-list>
      </v-navigation-drawer>
    </div>
    <div class="col col-xs-12 col-sm-9">
      <h2>My Day</h2>
      <span class="text-h6"> Work: {{myDay.length}} Time: {{totalTime}}</span>
      <v-list>
        <v-list-item v-for="item in myDay" :key="item._id">
          <simple-work-item @remove="removeFromMyDay" :item="item"></simple-work-item>
        </v-list-item>
      </v-list>
    </div>
  </div>

</template>

<script>
import {db} from "@/config/firebase";
import SimpleWorkList from "@/components/SimpleWorkList";
import UserClassModel from "@/models/UserClass";
import SimpleWorkItem from "@/components/SimpleWorkItem";

export default {
name: "MyDay",
  props: {
    authUser: {required: true},
  },
  data(){
    return{
      classes: [],
      currentClass: {name: null},

      myDay: [],
    }
  },
  components: {
    SimpleWorkList,
    SimpleWorkItem,
  },
  firestore() {
      return {
        classes: db.collection('users').doc(this.authUser.uid)
            .collection("classes").withConverter(UserClassModel),
      }
  } ,
  // TODO: Calculate total time and num tasks to display on right
  methods: {
    addToMyDay(item){
      if(!this.myDay.includes(item)){
        this.myDay.push(item);
        console.log("My Day", this.myDay)
      }
    },
    removeFromMyDay(item){
      this.myDay.splice(this.myDay.indexOf(item), 1);
      console.log("My Day", this.myDay)
    }
  },
  computed: {
    totalTime: function(){
      let total = 0;
      for (let i = 0; i < this.myDay.length; i++) {
        total += parseInt(this.myDay[i].time);
      }
      return total;
    }
  }
}
</script>

<style scoped>

</style>