import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const test_page = [
    {
      path: '/test1',
      name: 'Test1',
      component: () =>
        import('./views/test1.vue')
    },
    {
      path: '/test2',
      name: 'Test2',
      component: () =>
        import('./views/test2.vue')
    },
    {
      path: '/test3',
      name: 'Test3',
      component: () =>
        import('./views/test3.vue')
    },
    {
      path: '/test4',
      name: 'Test4',
      component: () =>
        import('./views/test4.vue')
    },
    {
      path: '/test5',
      name: 'Test5',
      component: () =>
        import('./views/test5.vue')
    },
    {
      path: '/test6',
      name: 'Test6',
      component: () =>
        import('./views/test6.vue')
    },
    {
      path: '/test7',
      name: 'Test7',
      component: () =>
        import('./views/test7.vue')
    },
    {
      path: '/test8',
      name: 'Test8',
      component: () =>
        import('./views/test8.vue')
    },
    {
      path: '/test9',
      name: 'Test9',
      component: () =>
        import('./views/test9.vue')
    },
    {
        path: '/test10',
        name: 'Test10',
        component: () =>
            import('./views/test10.vue')
    },
    {
      path: '/test11',
      name: 'Test11',
      component: () =>
          import('./views/test11.vue')
    },
    {
      path: '/test12',
      name: 'Test12',
      component: () =>
          import('./views/test12.vue')
    },
    {
      path: '/test13',
      name: 'Test13',
      component: () =>
          import('./views/test13.vue')
    },
    {
      path: '/delivery_manage',
      name: 'Delivery_manage',
      component: () => import('./views/delivery_manage/index.vue')
    },
    {
      path: '/operation',
      name: 'Operation',
      component: () => import('./views/operation/index.vue')
    },
    {
      path: '/slot',
      name: 'Slot',
      component: () => import('./views/slot/index.vue')
    },
    {
      path: '/mixin',
      name: 'Mixin',
      component: () => import('./views/mixin/index.vue')
    },
    {
      path: '/HOC',
      name: 'HOC',
      component: () => import('./views/HOC/index.vue')
    },
    {
      path: '/safeArea',
      name: 'safeArea',
      component: () => import('./views/safeArea/index.vue')
    },
    {
      path: '/excel',
      name: 'excel',
      component: () => import('./views/excel/index.vue')
    },
    {
      path: '/proxyData',
      name: 'proxyData',
      component: () => import('./views/proxyData/index.vue')
    },
    {
      path: '/component_tra',
      name: 'component_tra',
      component: () => import('./views/component_tra/index.vue')
    },
    {
      path: '/vue-key',
      name: 'vue-key',
      component: () => import('./views/vue-key/index.vue')
    },
    {
      path: '/component_Gravel',
      name: 'component_Gravel',
      component: () => import('./views/component_Gravel/index.vue')
    },
    {
      path: '/component_vant',
      name: 'component_vant',
      component: () => import('./views/component_vant/index.vue')
    },
    {
      path: '/$listeners',
      name: '$listeners',
      component: () => import('./views/$listeners/index.vue')
    },
    
]

const main_page = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/sass',
    name: 'Sass',
    component: () =>
      import('./views/Sass.vue')
  },
]

let routes = test_page.concat(main_page)
let router = new Router({
  routes
})
export {
  router,
  test_page
}
