import { wrapFunctional } from './utils'

export { default as Logo } from '../../components/Logo.vue'
export { default as TheHeader } from '../../components/TheHeader.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyTheHeader = import('../../components/TheHeader.vue' /* webpackChunkName: "components/the-header" */).then(c => wrapFunctional(c.default || c))
