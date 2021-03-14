import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Singer from "../views/Singer";
import PlayList from "../views/PlayList";
import MyList from "../views/MyList";
import My from "../views/My";
import Search from "../views/Search";
import Lyric from "../views/Lyric";

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
    path: '/my',
    name: 'My',
    component: My
  },{
    path: '/my-list',
    name: 'MyList',
    component: MyList
  },{
    path: '/search',
    name: 'Search',
    component: Search
  },{
    path:'/lyric',
    name: 'lyric',
    component:Lyric
  }
]

const router = new VueRouter({
  routes
})

export default router
