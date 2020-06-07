export const state = () => ({
  trainers: [],
  profile: {},
  error: ''
})

export const mutations = {
  setTrainers(state, payload) {
    state.trainers = payload
  },
  setTrainerProfile(state, payload) {
    state.profile = payload
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  async getTrainers({ commit }) {
    await this.$axios
      .get(`users/trainers/all/`)
      .then((response) => {
        if (response.status === 200) {
          commit('setTrainers', response.data)
        }
      })
      .catch((e) => {
        commit('setError', e)
      })
  },
  async getTrainerProfile({ commit }, id) {
    await this.$axios
      .get(`users/trainers/profiles/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.user) {
            commit('setTrainerProfile', response.data)
          }
        }
      })
      .catch((e) => {
        commit('setError', e)
      })
  }
}

export const getters = {
  trainers: (state) => state.trainers,
  profile: (state) => state.profile,
  errors: (state) => state.error,
  trainerUser: (state) => {
    return state.profile.user
  }
}
