import Vue from 'vue';
import router from './router';
import store from "@/store";
import App from "./App";
import VueRouter from "vue-router";
import {
    Tabbar,
    TabbarItem,
    NavBar,
    Icon,
    Swipe,
    SwipeItem,
    Lazyload,
    Image,
    List,
    Tag,
    Tab,
    Tabs,
    Sidebar,
    SidebarItem,
    Grid,
    GridItem,
    Form,
    Field,
    Button,
    Search,
    Toast,
    Popup,
    Cell,
    Dialog,
    PullRefresh
} from 'vant';

Vue.use(VueRouter);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Image);
Vue.use(List);
Vue.use(Tag);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button)
Vue.use(Search);
Vue.use(Toast)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(Dialog)
Vue.use(PullRefresh)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
