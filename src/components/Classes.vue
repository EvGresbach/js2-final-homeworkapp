<template>
  <div class="row">
    <!--  class list-->
    <div class="col col-xs-12 col-sm-3">
      <v-navigation-drawer permanent height="100%" width="100%">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Your Classes
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item v-for="c in classes" :key="c._id" @click="currentClass = c">{{c.name}}</v-list-item>
        </v-list>

        <v-spacer/>
        <v-divider/>
        <v-btn color="secondary" @click="addClassDialog = true">Add Class</v-btn>
      </v-navigation-drawer>
    </div>

    <!--  work for class-->
    <div class="col col-xs-12 col-sm-9">
      <template v-for="c in classes">
        <class v-show="currentClass === c" :key="c._id" :user-class="c" :auth-user="authUser"></class>
      </template>

      <!-- Dialogs -->
      <!-- Add Class Modal-->
      <div class="text-center">
        <v-dialog v-model="addClassDialog" max-width="40%">
          <v-card>
            <v-container>
              <v-card-title>Add Class</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="newClass.name" label="Class Name" required></v-text-field>
                </v-form>
              </v-card-text>
            </v-container>

            <v-card-actions>
              <v-btn color="primary" @click="addClass">Add Class</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <v-btn @click="test">??</v-btn>
  </div>
</template>

<script>

import {db} from "@/config/firebase";
import Class from "@/components/Class";
import UserClass from "../models/UserClass"
import UserClassModel from "../models/UserClass";

export default {
  name: "Classes",
  components:{
    Class,
  },

  props: {
    authUser: {
      required: true
    },
  },

  data() {
    return{
      newClass: new UserClass(),
      currentClass: null,
      //modals
      addClassDialog: false,

      classes: [],
    }
  },

  firestore() {
    return {
      classes: db.collection('users').doc(this.authUser.uid)
          .collection(UserClassModel.collectionName).withConverter(UserClassModel),
    }
  } ,

  methods: {
    addClass(){
      db.collection('users').doc(this.authUser.uid).collection('classes')
          .add(this.newClass.toFirestore());
      console.log("??");
      this.newClass = new UserClass();
      this.addClassDialog = false;
    },

    test(){
      console.log("Current Class: ", this.currentClass);
      console.log(this.classes);
    },
  },
}
</script>

<style scoped>
div.row{
  min-height: 100%;
}
</style>
