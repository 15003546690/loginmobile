import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['@/components/Index'], resolve);
const Loggin = resolve => require(['@/components/login/index'], resolve);
const LogginDetail = resolve => require(['@/components/login/detail'], resolve);
const Home = resolve => require(['@/components/index/index'], resolve);
const My = resolve => require(['@/components/my/index'], resolve);
const Menu = resolve => require(['@/components/my/menu'], resolve);
const AddMenu = resolve => require(['@/components/my/addMenu'], resolve);
const Parent = resolve => require(['@/components/my/parent'], resolve);
const AddParent = resolve => require(['@/components/my/addParent'], resolve);
const Son = resolve => require(['@/components/my/son'], resolve);
const AddSon = resolve => require(['@/components/my/addSon'], resolve);
const BtnPer = resolve => require(['@/components/my/btnPer'], resolve);
const UserPer = resolve => require(['@/components/my/userPer'], resolve);
const AddUser = resolve => require(['@/components/my/addUser'], resolve);
const UsersSet = resolve => require(['@/components/my/usersSet'], resolve);
const Organization = resolve => require(['@/components/my/organization'], resolve);
const UserInfo = resolve => require(['@/components/my/userInfo'], resolve);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Loggin',
      component: Loggin
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:'/login',
      children: [
        {
          path: '/login/detail',
          name: 'LogginDetail',
          component: LogginDetail,
        },
      	{
          path: '/login',
          name: 'Home',
          component: Home,
        },
        {
          path: '/my',
          name: 'My',
          component: My
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/menu/addmenu',
          name: 'AddMenu',
          component: AddMenu
        },
        {
          path: '/parent',
          name: 'Parent',
          component: Parent
        },
        {
          path: '/parent/addparent',
          name: 'AddParent',
          component: AddParent
        },
        {
          path: '/son',
          name: 'Son',
          component: Son
        },
        {
          path: '/son/addSon',
          name: 'AddSon',
          component: AddSon
        },
        {
          path: '/son/btnPer',
          name: 'BtnPer',
          component: BtnPer
        },
        {
          path: '/userPer',
          name: 'UserPer',
          component: UserPer
        },
        {
          path: '/userPer/adduser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: '/userPer/usersSet',
          name: 'UsersSet',
          component: UsersSet
        },
        {
          path: '/organization',
          name: 'Organization',
          component: Organization
        },
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: UserInfo
        },
      ]
    },
  ]
})
