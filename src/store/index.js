import Vue from 'vue'
import Vuex from 'vuex'
import configure from './configure'
import user from './user'
import song from './song'
import {Notification} from 'element-ui';
import {getRequest} from "../utils/api";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
  state: {
    sessions: {},
    listeners: [],
    currentListener: JSON.parse(window.sessionStorage.getItem("user")),
    currentSession: null,
    filterKey: '',
    stomp: null,
    isDot: {}
  },
  getters: {},
  mutations: {
    INIT_CURRENTLISTENER(state, listener) {
      state.currentListener = listener
    },
    changeCurrentSession(state, currentSession) {
      Vue.set(state.isDot, state.currentListener.username + '#' + currentSession.username, false);
      state.currentSession = currentSession;
    },
    addMessage(state, msg) {
      let mss = state.sessions[state.currentListener.username + '#' + msg.to];
      if (!mss) {
        // state.sessions[state.currentListener.username+'#'+msg.to] = [];
        Vue.set(state.sessions, state.currentListener.username + '#' + msg.to, []);
      }
      state.sessions[state.currentListener.username + '#' + msg.to].push({
        content: msg.content,
        date: new Date(),
        self: !msg.notSelf
      })
    },
    INIT_DATA(state) {
      // 浏览器本地聊天记录可以在这里完成
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    INIT_LISTENER(state, data) {
      state.listeners = data;
    }
  },
  actions: {
    connect(context) {
      context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
      context.state.stomp.connect({}, success => {
        context.state.stomp.subscribe('/user/queue/chat', msg => {
          let receiveMsg = JSON.parse(msg.body);
          if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
            Notification.info({
              title: '【' + receiveMsg.fromNickname + '】发来一条消息',
              message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
              position: 'bottom-right'
            })
            Vue.set(context.state.isDot, context.state.currentListener.username + '#' + receiveMsg.from, true);
          }
          receiveMsg.notSelf = true;
          receiveMsg.to = receiveMsg.from;
          context.commit('addMessage', receiveMsg);
        })
      }, error => {

      })
    },
    initData(context) {
      context.commit('INIT_DATA')
      getRequest("/chat/listeners").then(resp => {
        if (resp) {
          context.commit('INIT_LISTENER', resp);
        }
      })
    }
  },
  modules: {
    configure,
    user,
    song,
  }
})

store.watch(function (state) {
  return state.sessions
}, function (val) {
  localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
  deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

export default store
