import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e2bd01f8 = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _37814752 = () => interopDefault(import('../pages/posts/new.vue' /* webpackChunkName: "pages/posts/new" */))
const _23cb726c = () => interopDefault(import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */))
const _43e700be = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _7185c2c0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/posts",
    component: _e2bd01f8,
    name: "posts"
  }, {
    path: "/posts/new",
    component: _37814752,
    name: "posts-new"
  }, {
    path: "/posts/:id",
    component: _23cb726c,
    name: "posts-id"
  }, {
    path: "/users/:id?",
    component: _43e700be,
    name: "users-id"
  }, {
    path: "/",
    component: _7185c2c0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
