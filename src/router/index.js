import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Singer from "../views/Singer";
import PlayList from "../views/PlayList";
import MyList from "../views/MyList";
import MyMusic from "../views/MyMusic";
import Search from "../views/Search";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/singer',
    name: 'singer',
    component: Singer
  },{
    path: '/play-list',
    name: 'PlayList',
    component: PlayList
  },{
    path: '/my-music',
    name: 'MyMusic',
    component: MyMusic
  },{
    path: '/my-list',
    name: 'MyList',
    component: MyList
  },{
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
