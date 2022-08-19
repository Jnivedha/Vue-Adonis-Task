import { createRouter, createWebHistory } from 'vue-router'
import deptData from '../components/deptData.vue'
import addDept from '../components/addDept.vue'
import empData from '../components/empData.vue'
import addEmp from '../components/addEmp.vue'

const routes = [
 
  {
    path: '/deptData',
    name: 'deptData',
    component: deptData
  },

  {
    path: '/addDept',
    name: 'addDept',
    component: addDept
  },

  {
    path: '/empData',
    name: 'empData',
    component: empData
  },

  {
    path: '/addEmp',
    name: 'addEmp',
    component: addEmp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
