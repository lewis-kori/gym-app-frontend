export const state = () => ({
  trainers: [],
  profile: {
    profiles: [],
    message: '',
    error: ''
  },
  error: ''
})

export const mutations = {
  setTrainers(state, payload) {
    state.trainers = payload
  },
  setTrainerProfile(state, payload) {
    state.profile.profiles = payload
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
  async getTrainerProfile({ commit }) {
    await this.$axios
      .get(`users/trainers/profiles/`)
      .then((response) => {
        if (response.status === 200) {
          commit('setTrainerProfile', response.data)
        }
      })
      .catch((e) => {
        commit('setError', e)
      })
  }
}

export const getters = {
  trainers: (state) => state.trainers,
  profiles: (state) => state.profile.profiles,
  getProfile: (state) => (id) => {
    return state.profile.profiles.find((profile) => profile.user.id === id)
  },
  errors: (state) => state.error
}
