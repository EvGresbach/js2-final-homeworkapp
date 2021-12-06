<template>
  <div>
    <v-expansion-panels focusable :class="item.deleted || item.complete ? 'complete' : ''">
      <v-expansion-panel class="ma-1">
        <v-expansion-panel-header>
          <div class="row">
            <div class="col col-xs-12 col-sm-6">{{item.name}}</div>
            <div class="col col-xs-12 col-sm-3">
              {{item.remainingTime}}/{{item.time}}
            </div>
            <div class="col col-xs-12 col-sm-2">
              <span :class="item.dueDate < today ? 'red--text' : ''">{{item.formatDate()}}</span>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <component :is="itemType" :item="item" @update="save"></component>
          <div justify="right">
            <v-btn class="check" text @click="completeWork"><v-icon>mdi-check</v-icon></v-btn>
            <v-btn class="edit" text @click="editWorkDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn class="delete" :color="item.deleted ? 'red' : ''" text @click="deleteWork"><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>

    <!--Edit Work Dialog-->
    <div class="text-center">
      <v-dialog v-model="editWorkDialog">
        <v-card>
          <!-- Use steppers to guide user through adding assignments -->
          <v-card-title class="justify-center text-h4">Edit {{itemType}}</v-card-title>
          <v-card-text>
            <!-- TODO: FORM -->
            <v-stepper v-model="slideController">
              <v-stepper-header>
                <v-stepper-step :complete="slideController > 1" step="1">Get Test Information</v-stepper-step>
                <v-divider/>
                <v-stepper-step :complete="slideController > 2" step="2">Review Your Test</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <!-- Use separate forms for the required stuff  -->
                <v-stepper-content step="1">
                  <v-form>
                    <v-card flat tile>
                      <!-- Title, description, due date, class-->
                      <div class="row">
                        <div class="col col-xs-12 col-sm-6">
                          <v-text-field v-model="item.name" label="Assignment Name"
                                        :rules="nameRules" required></v-text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-10">
                          <v-textarea v-model="item.description" label="Description"></v-textarea>
                        </div>
                        <div v-if="itemType === 'Assignment' && this.item.tasks.length > 0" class="col col-xs-12 col-sm-2">
                          <v-text-field v-model="item.time" label="Estimated Time"></v-text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-6">
                          <v-text-field v-model="item.dueDate" label="Due Date"></v-text-field>
                        </div>
                        <div class="col col-xs-12 col-sm-6">
                          <v-date-picker v-model="item.dueDate" label="Due Date Picker" show-current
                                         required></v-date-picker>
                        </div>
                      </div>
                    </v-card>
                    <v-btn @click="slideController++">Next</v-btn>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card flat tile>
                    <v-card-title>{{item.name}}</v-card-title>
                    <v-card-text>

                      <div>Assignment Description: {{item.description}}</div>
                      <div class="row">
                        <div class="col col-xs-12 col-sm-4">
                          Estimated Time: {{item.time}}
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-btn @click="slideController--">Back</v-btn>
                  <v-btn @click="save">Finish</v-btn>
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
import Assignment from "@/components/Assignment";
import Test from "@/components/Test";
import {db} from "@/config/firebase";

export default {
name: "WorkItem",
  props:{
    item: {
      required: true,
    }
  },
  data(){
    return{
      editWorkDialog: false,
      slideController: 1,
      //rules
      nameRules: [v => !!v || "Please name your assignment"],
      classRules: [
        v=> !!v || "Please pick a class",
      ],
    }
  },
  components:{
    Assignment,
    Test,
  },
  methods: {
    completeWork(){
      this.item.toggleComplete();
      var path = this.item._path.split('/');

      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3])//class
          .collection(path[4]).doc(path[5])//assignment
          .update({complete: this.item.complete})
          .then(() => {
            console.log("Success!");
          })
          .catch((error) => {console.error("Update failed: ", error)})
    },
    save(){
      var path = this.item._path.split('/');
      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3])//class
          .collection(path[4]).doc(path[5])//assignment
          .update({
            name: this.item.name,
            description: this.item.description,
            date: this.item.dueDate,
            time: this.item.time,
          })
          .then(() => {
            console.log("Success: Assignment " + this.item.name + " updated");
            this.editWorkDialog = false;
          })
          .catch((error) => {console.error("Update failed: ", error)})
    },
    deleteWork(){
      this.item.toggleDeleted();
      var path = this.item._path.split('/');

      db.collection(path[0]).doc(path[1]) //user
          .collection(path[2]).doc(path[3])//class
          .collection(path[4]).doc(path[5])//assignment
          .update({deleted: this.item.deleted})
          .then(() => {
            console.log("Success: " + this.itemType + " updated");
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
  },
}
</script>

<style scoped>

div.v-list-item.theme--light div{
  width: 100%;
}
div.v-expansion-panel button:hover{
  background-color: #EDCA00;
}
button.check, button.edit{
  color: black;
}
button.check:hover{
  color: green;
}
button.edit:hover{
  color: #faf4bd;
}
button.delete:hover{
  color: darkred;
}
div.complete /deep/ div, div.complete /deep/ label{
  color: lightgrey;
}
div.complete:hover button.v-expansion-panel-header, div.complete:hover button.v-expansion-panel-header div{
  background-color: #EDCA00;
  color: gray;
}
</style>