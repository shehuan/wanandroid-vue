import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 主页选中的tab索引
        mainTabBarActive: 0,
        // 搜索记录
        searchHistory: [],
        // 用户信息
        userInfo: {},
        // 根路由（App中的router-view）要缓存的页面组件
        catchPages: "Main"
    },
    // 更新state中的状态数据
    mutations: {
        updateMainTabBarActive(state, active) {
            state.mainTabBarActive = active;
        },
        // 添加新的搜索记录
        addSearchHistory(state, keyword) {
            let index = state.searchHistory.indexOf(keyword);
            if (index >= 0) {
                state.searchHistory.splice(index, 1);
            }
            state.searchHistory.unshift(keyword);
            if (state.searchHistory.length > 20) {
                state.searchHistory.splice(20, state.searchHistory.length);
            }
        },
        // 初始化搜索记录
        initSearchHistory(state) {
            let data = localStorage.getItem('searchHistory');
            state.searchHistory = data ? JSON.parse(data) : []
        },
        // 清空搜索记录
        clearSearchHistory(state) {
            state.searchHistory = [];
        },

        // 保存用户信息
        saveUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        },
        // 获取用户信息
        initUserInfo(state) {
            let data = localStorage.getItem('userInfo');
            state.userInfo = data ? JSON.parse(data) : {nickname: '登录'};
        },
        // 清除用户信息
        clearUserInfo(state) {
            state.userInfo = {nickname: '登录'};
            localStorage.removeItem('userInfo');
        },

        // 添加要缓存的页面组件
        addKeepAlive(state, name) {
            if (state.catchPages.indexOf(name) > 0) {
                return;
            }
            state.catchPages += ',' + name;
        },
        // 移除已缓存的页面组件
        removeKeepAlive(state, name) {
            state.catchPages = state.catchPages.replace(`,${name}`, '');
        }
    },
    // actions中通过mutations中的方法变更状态，而不是直接操作state，其中可以执行异步操作
    actions: {},
    modules: {}
})

store.watch(function (state) {
    return state.searchHistory
}, function (val) {
    localStorage.setItem('searchHistory', JSON.stringify(val));
}, {
    deep: true
})

export default store;