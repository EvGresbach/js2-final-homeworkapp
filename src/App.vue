<template>
  <v-app>
    <v-app-bar dense app max-height="10%" color="primary">
      <v-toolbar-title>Homework App</v-toolbar-title>
      <v-spacer/>
      <v-btn class="nav" tile text><router-link class="link" to="/home">Home</router-link></v-btn>|
      <v-btn class="nav" tile text><router-link class="link" to="/classes">Classes</router-link></v-btn>|
      <v-btn class="nav" tile text><router-link class="link" to="/my-day">My Day</router-link></v-btn>|
<!--      <router-link class="link" to="/achievements">Achievements</router-link> |-->
<!--      <router-link class="link" to="/leaderboard">Leaderboard</router-link> |-->
      <v-btn class="nav" tile text v-if="!authUser" @click="login">Login</v-btn>
      <v-btn class="nav" tile text v-else @click="logout">Logout</v-btn>
<!--      <div class="text-center">-->
<!--        <v-menu offset-y>-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <v-btn-->
<!--                v-bind="attrs"-->
<!--                v-on="on"-->
<!--                text>-->
<!--              Profile-->
<!--            </v-btn>-->
<!--          </template>-->
<!--          <v-list>-->
<!--            <v-list-item>-->
<!--              <router-link to="/profile">Profile</router-link>-->
<!--            </v-list-item>-->
<!--            <v-list-item v-if="!authUser" @click="login">-->
<!--              <v-list-item-title>Login</v-list-item-title>-->
<!--            </v-list-item>-->
<!--            <v-list-item v-else @click="logout">-->
<!--              <v-list-item-title>Logout</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--        </v-menu>-->
<!--      </div>-->
    </v-app-bar>

    <v-main v-if="authUser">
      <router-view :authUser="authUser"></router-view>
    </v-main>
    <v-container v-else class="mt-12 red--text">
      <p>Please log in to see information</p>
    </v-container>
  </v-app>
</template>

<script>
import {firebase, db} from "./config/firebase";


export default {
  name: 'App',

  components: {

  },

  data(){
    return{
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
      this.authUser = null;
    },
    test(){
      console.log(this.classes);
    }
  },

  created: function(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.authUser = user;
        //add user to firebase if they aren't there already
        db.collection('users').doc(this.authUser.uid).get()
            .then((snapshot) => {
              if(!snapshot.data()) {
                db.collection('users').doc(this.authUser.uid)
                    .set({
                      name: this.authUser.displayName,
                      workTime: 0,
                      lastLoggedIn: new Date(),
                    })
                    .catch((error) => {
                      console.error(error)
                    })
              }

            })
      } else {
        this.authUser = null;
      }
    })
  },
};
</script>

<style>
.v-application a.link {
  color: black;
  text-decoration: none;
}
.nav.v-btn:before{
  background-color: inherit;
}
.nav.v-btn:hover, .nav.v-btn:hover a.link{
  color: dimgray;
}
</style>