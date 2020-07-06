import Vue from 'vue'
import VueRouter from 'vue-router'
import DrillcoreTable from '../views/DrillcoreTable';
import DrillcoreItem from '../views/DrillcoreItem'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DrillcoreTable',
    component: DrillcoreTable
  },
  {
    path: '/drillcore/:id',
    name: 'drillcoreItem',
    component: DrillcoreItem,
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10);

      if (Number.isNaN(id)) {
        return 0;
      }

      return { id };
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
