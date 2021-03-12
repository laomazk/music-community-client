<template>
    <div class="the-header">
        <div class="header-logo" @click="goHome">
            <!--            <svg class="icon">-->
            <!--            <use xlink:href = "#icon-erji"></use>-->
            <!--        </svg>-->
            <div class="collapse-btn">
                <i class="fa fa-apple"></i>
            </div>
            <span>NetMusic</span>
        </div>
        <ul class="navbar">
            <li :class="{active: item.name == activeName}" v-for="item in navMsg" :key="item.path"
                @click="goPage(item.path,item.name)">
                {{item.name}}
            </li>
            <li>
                <div class="header-search">
                    <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords">
                    <div class="search-btn" @click="goSearch()">
                        <svg class="icon">
                            <use xlink:href = "#icon-sousuo"></use>
                        </svg>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {navMsg} from "../assets/data/header";
import {mapGetters} from 'vuex'

export default {
  name: "TheHeader",
  data() {
    return {
      navMsg: [],    //左侧导航栏
      keywords: '',  //搜索关键字
      loginMsg: [],  //右侧导航栏
      menuList: [], //用户下拉菜单
    }
  },
  computed: {
    ...mapGetters([
      'activeName'
    ])
  },
  created() {
    this.navMsg = navMsg;
  },
  methods: {
    goHome() {
      this.$router.push({path: "/"})
    },
    goPage(path, name) {
      this.$store.commit('setActiveName', name);
      this.$router.push({path: path})
    },
    goSearch(){
      this.$router.push({path:'/search',query:{keywords: this.keywords}})
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../assets/css/the-header.scss';

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
</style>
