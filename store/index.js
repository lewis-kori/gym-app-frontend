export const mutations = {
  setProfile(state) {
    state.auth.user.has_profile = true
  }
}
export const getters = {
  isAuthenticated: (state) => state.auth.loggedIn,
  loggedInUser: (state) => state.auth.user
}
