<template>
  <v-app>
    <v-toolbar dense app max-height="10%" color="primary">
      <v-toolbar-title>Homework App</v-toolbar-title>
      <v-spacer/>
      <router-link to="/home">Home</router-link> |
      <router-link to="/classes">Classes</router-link> |
      <router-link to="/my-day">My Day</router-link> |
      <router-link to="/achievements">Achievements</router-link> |
      <router-link to="/leaderboard">Leaderboard</router-link> |
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              Dropdown
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <router-link to="/profile">Profile</router-link>
            </v-list-item>
            <v-list-item v-if="!authUser" @click="login">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item v-else @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>

    <v-content v-if="authUser">
      <router-view :authUser="authUser"></router-view>
    </v-content>
    <v-container color="warning">
      <p>Please log in to see information</p>
    </v-container>
  </v-app>
</template>

<script>
import {db} from "./config/firebase"
import firebase from "firebase";
export default {
  name: 'App',

  components: {

  },

  data(){
    return{
      classes: [],
      authUser: null,
      userDoc: null,
    }
  },

  methods: {
    login(){
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth()
        .signInWithPopup(provider)

        .catch(function(error){
          console.error("Login failed ", error);
        })

    },
    logout(){
      firebase.auth().signOut();
    },

    test(){
      db.collection('users').doc("csa1YEw10gPURl2mfPZgg6D2TRO2").get().then((snapshot) => {
      console.log(snapshot.data())})
      // db.collection('users')
      //     .add({id: this.authUser.uid, name: this.authUser.displayName});
    }
  },

  created: function(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log(user);
        this.authUser = user;
        //add user to firebase if they aren't there already
        db.collection('users').doc(this.authUser.uid).get()
            .then((snapshot) => {
              if(!snapshot.data()) {
                db.collection('users').doc(this.authUser.uid)
                    .set({name: this.authUser.displayName})
                    .catch((error) => {
                      console.error(error)
                    })
              }
            })
      } else {
        console.log('not signed in');

        this.authUser = null;
      }
    })
  }
};
</script>

<style>
.v-toolbar_content .v-application a{
  color: dimgrey;
}
</style>