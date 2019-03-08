/**
 * store
 * @authors Your Name (you@example.org)
 * @date    2018-12-05 18:40:16
 * @version $Id$
 */
import Vue from 'vue'
import Vuex from 'vuex'

const permission = {
  state: {
    isRouterAlive: true,
    user: {
      rightList: []
    }
  },
  mutations: {
    SET_ISROUTERALIVE: (state, isRouterAlive) => {
      state.isRouterAlive = isRouterAlive
    }
  },
  actions: {
    // 设置当前用户显示仓库
    reload ({ commit }) {
      commit('SET_ISROUTERALIVE', false) // 仓库名
      setTimeout(() => {
        commit('SET_ISROUTERALIVE', true) // 仓库名
      }, 0)
    }
  }
}

Vue.use(Vuex)

const store = new Vuex.Store(permission)

export default store
