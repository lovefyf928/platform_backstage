import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import main from './components/main'
import FloorAD from './views/FloorAD'
import AddFloor from './views/AddFloor'
import ADSetting from './views/ADSetting'
import HotShop from './views/HotShop'
import SelectShop from './views/SelectShop'
import HotAD from './views/HotAD'
import HotShopJump from './views/HotShopJump'
import SelectShopJump from './views/SelectShopJump'
import Integral from './views/Integral'
import Commodity from './views/commodity'
import AddIntegral from './views/AddIntegral'
import Detail from './views/Detail'
import ArticlesList from './views/ArticlesList'
import AddArticle from './views/AddArticle'
import test from './components/test'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        component: login
      },
      {
        path: '/main',
        component: main,
        children: [
            {
                path: "/main/AA",
                component: AddArticle
            },
            {
                path: "/main/AL",
                component: ArticlesList
            },
            {
                path: "/main/detail",
                component: Detail
            },
            {
                path: "/main/AI",
                component: AddIntegral
            },
            {
                path: "/main/AddFloor",
                component: AddFloor
            },
            {
                path: '/main/SelectShopJump',
                component: SelectShopJump
            },
            {
                path: '/main/in',
                component: Integral
            },
            {
                path: '/main/comm',
                component: Commodity
            },
            {
                path: "/main/ADSetting",
                component: ADSetting
            },
            {
                path: "/main/HotShop",
                component: HotShop
            },
            {
                path: "/main/FloorAD",
                component: FloorAD
            },
            {
                path: '/main/SelectShop',
                component: SelectShop
            },
            {
                path: '/main/HotAD',
                component: HotAD
            },
            {
                path: '/main/HotShopJump',
                component: HotShopJump
            },
        ]
      }
  ]
})
