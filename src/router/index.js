import Vue from 'vue'
import store from "@/store";
import VueRouter from 'vue-router'
import Main from "@/views/main/Main";
import Home from "@/views/main/home/Home";
import Project from "@/views/main/project/Project";
import Tree from "@/views/main/tree/Tree";
import Nav from "@/views/main/nav/Nav";
import Chapter from "@/views/main/chapter/Chapter";
import Search from "@/views/search/Search";
import Login from "@/views/login/Login";
import ChapterDetail from "@/views/main/chapter/detail/ChapterDetail";
import TreeDetail from "@/views/main/tree/detail/TreeDetail";
import Collection from "@/views/collection/Collection";
import Register from "@/views/register/Register";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        // 重定向到首页item
        redirect: {name: 'Home'},
        component: Main,
        // meta: {
        //     keepAlive: true
        // },
        children:
            [
                {
                    path: '/home',
                    name: 'Home',
                    component: Home,
                },
                {
                    path: '/project',
                    name: 'Project',
                    component: Project,
                },
                {
                    path: '/tree',
                    name: 'Tree',
                    component: Tree,
                },
                {
                    path: '/nav',
                    name: 'Nav',
                    component: Nav,
                },
                {
                    path: '/chapter',
                    name: 'Chapter',
                    component: Chapter,
                }
            ]
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/tree/detail',
        name: 'TreeDetail',
        component: TreeDetail,
    },
    {
        path: '/chapter/detail',
        name: 'ChapterDetail',
        component: ChapterDetail,
    },
    {
        path: '/collection',
        name: 'Collection',
        component: Collection,
    },
    // 通配符 * 会匹配所有路径
    // 路由 { path: '*' } 通常用于客户端 404 错误
    // 含有通配符的路由应该放在最后
    {path: "*", redirect: {name: "Home"}}
]

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    let active = 0
    switch (to.name) {
        case 'Home':
            active = 0;
            break;
        case 'Project':
            active = 1;
            break;
        case 'Tree':
            active = 2;
            break;
        case 'Nav':
            active = 3;
            break;
        case 'Chapter':
            active = 4;
            break;
    }
    store.commit('updateMainTabBarActive', active);

    let pages = ['Home', 'Project', 'Tree', 'Nav', 'Chapter'];

    if (to.name === 'Login') {
        // 要在去目标页面时，缓存目标页面，否则无效
        store.commit('addKeepAlive', 'Login')
    }

    if (pages.includes(to.name) && from.name === 'Login') {
        // 移除指定页面组件
        store.commit('removeKeepAlive', 'Login')
    }

    next();
});

export default router
