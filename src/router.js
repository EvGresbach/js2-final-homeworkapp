import Vue from 'vue'
import VueRouter from "vue-router"

//import pages
import Home from "@/components/Home";
import Classes from "@/components/Classes";
import MyDay from "@/components/MyDay";
import Achievements from "@/components/Achievements";
import Leaderboard from "@/components/Leaderboard";
import Profile from "@/components/Profile";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: Home, props: true,},
        {name: 'home', path: '/home', component: Home, props: true,},
        {name: 'classes', path: '/classes', component: Classes, props: true,},
        {name: 'my-day', path: '/my-day', component: MyDay, props: true,},
        {name: 'achievements', path: '/achievements', component: Achievements, props: true,},
        {name: 'leaderboard', path: '/leaderboard', component: Leaderboard, props: true,},
        {name: 'profile', path: '/profile', component: Profile, props: true,},
    ]
})

export default router;