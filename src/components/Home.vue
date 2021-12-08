<template>
  <v-container>
    <div class="row">
      <div class=" col col-xs-12 col-sm-8">
        <!-- Welcome message -->
        <h1>Welcome back<span v-if="authUser">, {{ authUser.displayName }}</span></h1>
        <p>Let's get back to work!</p>
      </div>
<!--      <v-col sm="12" md="4">-->
<!--        &lt;!&ndash;  leaderboard overview  &ndash;&gt;-->
<!--          <h4>Today's Top Scores</h4>-->
<!--          <div class="container">-->
<!--          </div>-->
<!--      </v-col>-->
    </div>
    <div class="row">
      <div class="col col-xs-12 col-sm-6">
        <!--  Work Overview  -->
        <div class="container">
          <v-tabs fixed-tabs>
            <v-tab>Overdue</v-tab>
            <v-tab>Today</v-tab>
            <v-tab>This week</v-tab>
            <!-- Overdue -->
            <v-tab-item>
              <v-card flat>
                <v-list>
                  <v-list-item v-for="item in overdue" :key="item._id">
                    <v-layout justify-space-between>
                      <span>{{item.name}}</span>
                      <span>{{item.time}}</span>
                      <span :class="item.date < today ? 'red--text' : ''">{{item.date}}</span>
                    </v-layout>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-tab-item>
            <!-- Today -->
            <v-tab-item>
              <v-card flat>
                <v-list>
                  <v-list-item v-for="item in dueToday" :key="item._id">
                    <v-layout justify-space-between>
                      <span>{{item.name}}</span>
                      <span>{{item.time}}</span>
                      <span :class="item.date < today ? 'red--text' : ''">{{item.date}}</span>
                    </v-layout>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-tab-item>
            <!-- This Week -->
            <v-tab-item>
              <v-card flat>
                <v-list>
                  <v-list-item v-for="item in dueThisWeek" :key="item._id">
                    <v-layout justify-space-between>
                      <span>{{item.name}}</span>
                      <span>{{item.time}}</span>
                      <span :class="item.date < today ? 'red--text' : ''">{{item.date}}</span>
                    </v-layout>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
<!--      <v-col sm="12" md="4">-->
<!--        &lt;!&ndash;  current badges  &ndash;&gt;-->
<!--        <h4>Achievements</h4>-->
<!--        <div class="container">-->

<!--        </div>-->
<!--      </v-col>-->
      <div class="col col-xs-12  col-sm-6">
        <!--  recommended work  -->
        <h4>Recommended Work</h4>
        <div class="container pa-0">
          <v-list>
            <v-list-item v-for="item in recommended" :key="item._id" class="px-0">
              <v-list-item-content>
                <v-layout justify-space-between>
                  <span>{{item.name}}</span>
                  <span>{{item.time}}</span>
                  <span :class="item.date < today ? 'red--text' : ''">{{item.date}}</span>
                </v-layout>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>

import {db} from "@/config/firebase";
import UserClassModel from "@/models/UserClass";

export default {
  name: "Home",
  props: {
    authUser: {
      required: true,
    }
  },
  data(){
    return{
      classes: [],
      allWork: [],
    }
  },
  firestore() {
    return {
      classes: db.collection('users').doc(this.authUser.uid)
          .collection(UserClassModel.collectionName).withConverter(UserClassModel),
    }
  },
  methods: {
    getAssignments(path){
      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3]) //class
          .collection("assignments").get()
          .then((snapshot) => {
            console.log("Found " + snapshot.size + " assignments");
            snapshot.forEach((doc) => {
              let assignment = doc.data();
              if(!assignment.complete && !assignment.deleted){
                if(assignment.time == '')
                  assignment.time = assignment.baseTime;

                assignment._path = doc.ref.path;
                assignment._id = doc.id;
                this.allWork.push(assignment);
                console.log("Assignment Read: ", assignment);
              }
            })
          })
          .catch(error => {console.error(error)})
    },
    getTests(path){
      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3]) //class
          .collection("tests").get()
          .then((snapshot) => {
            console.log("Found " + snapshot.size + " tests");
            snapshot.forEach((doc) => {
              let test = doc.data();
              if(!test.complete && !test.deleted) {
                test._path = doc.ref.path;
                test._id = doc.id;
                this.allWork.push(test);
                console.log("Test Read: ", test);
              }
            })
          })
          .catch(error => {console.error(error)})
    },
    getTasks(path){
      console.log(path);
      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3]) //class
          .collection(path[4]).doc(path[5]) //assignment
          .collection('tasks').get()
          .then(snapshot => {
            console.log("Found " + snapshot.size + " tasks");
            snapshot.forEach(doc => {
              let task = doc.data();
              if(!task.complete && !task.deleted) {
                task._path = doc.ref.path;
                task._id = doc.id;
                this.allWork.push(task);
                console.log("task Read: ", task);
              }
            })
          })
          .catch(error => {console.error(error)})
    },

  },
  watch: {
    classes: function(){
      for (let i = 0; i < this.classes.length; i++) {
        let path = this.classes[i]._path.split('/');
        this.getAssignments(path);
        this.getTests(path);
      }
    },
    allWork: function(){
      for (let i = 0; i < this.allWork.length; i++) {
        //check that it is an assignment and it hasn't already been read
        if(this.allWork[i].assignment && !this.allWork[i].read){
          let path = this.allWork[i]._path.split('/');
          this.getTasks(path);
          this.allWork[i].read = true;
        }
      }
    }
  },
  computed: {
    today(){
      let today = new Date();
      var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
      var MM = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
      var yyyy = today.getFullYear();
      today = yyyy + '-' + MM + '-' + dd;
      return today;
    },
    overdue: function(){
      let arr = this.allWork.filter(item => item.date < this.today && !item.complete)
      return arr.sort((a, b)=>{console.log(a.date, b.date); return a.date - b.date;})
    },
    dueToday: function(){
      return this.allWork.filter((item) => {
        return item.date === this.today && !item.complete;
      }).sort((a, b)=>{return a.date - b.date;})
    },
    dueThisWeek: function(){
      //get first and last day of week
      var today = new Date();
      var day = today.getDay();
      var first = today.getDate() - day + (day == 0 ? -7:0);
      let last = first + 6;
      let firstDay = new Date(today.setDate(first));
      let lastDay = new Date(today.setDate(last));

      //format them to compare with date
      var dd = (firstDay.getDate() < 10 ? '0' : '') + firstDay.getDate();
      var MM = ((firstDay.getMonth() + 1) < 10 ? '0' : '') + (firstDay.getMonth() + 1);
      var yyyy = firstDay.getFullYear();
      firstDay = yyyy + '-' + MM + '-' + dd;

      dd = (lastDay.getDate() < 10 ? '0' : '') + lastDay.getDate();
      MM = ((lastDay.getMonth() + 1) < 10 ? '0' : '') + (lastDay.getMonth() + 1);
      yyyy = lastDay.getFullYear();
      lastDay = yyyy + '-' + MM + '-' + dd;
      //return all items within the first and last day of this week
      return this.allWork.filter(item => item.date > firstDay && item.date < lastDay && !item.complete).sort((a, b)=>{return a.date - b.date;})
    },
    recommended: function(){
      let overdue = this.overdue;
      let dueToday = this.dueToday
      let arr = [].concat(overdue, dueToday)
      return arr.sort((a, b)=>{return a.date - b.date;});
    }
  }
}
</script>

<style scoped>


</style>