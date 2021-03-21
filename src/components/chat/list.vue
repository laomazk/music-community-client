<template>
    <div id="ChatList">
            <ul style="padding-left: 0px">
                <li v-for="item in listeners" :class="{ active: currentSession?item.username === currentSession.username:false}"
                    v-on:click="changeCurrentSession(item)">
                    <!--   :class="[item.id === currentSession ? 'active':'']" -->
                    <img class="avatar" :src="item.avator" :alt="item.username">
                    <!--                <el-badge is-dot><p class="name">{{item.username}}</p></el-badge>-->
                    <el-badge :is-dot="isDot[user.username+'#'+item.username]"><p class="name">{{item.username}}</p></el-badge>
                </li>
            </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'list',
  data() {
    return {
      user:JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  computed: mapState([
    'listeners',
    'isDot',
    'currentSession'
  ]),
  methods: {
    changeCurrentSession(currentSession) {
      this.$store.commit('changeCurrentSession', currentSession)
    }
  }
}
</script>

<style lang="scss" scoped>
    #ChatList {
        /*overflow-y: scroll;*/
        li {
            padding: 16px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            list-style: none;

            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
        }

        li.active { /*注意这个是.不是冒号:*/
            background-color: rgba(255, 255, 255, 0.1);
        }

        .avatar {
            border-radius: 2px;
            width: 30px;
            height: 30px;
            vertical-align: middle;
        }

        .name {
            display: inline-block;
            margin-left: 15px;
            margin-top: 0;
            margin-bottom: 0;
        }
    }
</style>
