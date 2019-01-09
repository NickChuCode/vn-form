import Vue from 'vue'
import Router from 'vue-router'
import Form from './views/form'
import Checkbox from './views/checkbox'
import Alert from './views/alert'
import TableRender from './views/table-render.vue'
import TableSlot from './views/table-slot.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: Checkbox
    },
    {
      path: '/alert',
      name: 'alert',
      component: Alert
    },
    {
      path: '/table_render',
      name: 'tableRender',
      component: TableRender
    },
    {
      path: '/table_slot',
      name: 'tableSlot',
      component: TableSlot
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
