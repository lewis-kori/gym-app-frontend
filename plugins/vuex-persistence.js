import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) {
    return
  }
  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState()(store)
    })
  }
}
