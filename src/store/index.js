import Vue from "vue";
import Vuex from "vuex";
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: 'tong',
    phone: '18650035555'
  },

  // state变形
  getters: {
    merge: state => {
      return state.name + state.phone
    }
  },

 // 同步
  mutations: {
    initData(state, payload) {
      let oFileter = JSON.parse(window.localStorage.getItem('vuex')) || {}
      Object.keys(payload).forEach(key => {
        // 本地数据优先级高于传入数据,本地存储存在该属性，传入的值不覆盖
        if(oFileter[key] === null || oFileter[key] === '' || oFileter[key] === undefined) {
          // 新增属性 动态添加
          Vue.set(state, key, payload[key]); // 视图渲染
        }
      })
    },

    setData(state, payload) {
      // 传入空值可以清除
      Object.keys(payload).forEach(key => {
        Vue.set(state, key, payload[key]);
      })
    },

  },

  // 异步
  actions: {
    setData (context, payload) {
      context.commit('setData', payload)
    }
  },

  strict: debug,
  plugins: debug ?
    [
      createLogger(),
      createPersistedState()
    ] :
    [
      createPersistedState()
    ]
});
