export const state = () => ({
  classes: null,
  class: {
    message: '',
    error: ''
  },
  error: ''
})

export const mutations = {
  setClasses(state, payload) {
    state.classes = payload
  },
  setError(state, error) {
    state.error = error
  },
  setSuccess(state, payload) {
    state.class.message = payload
  },
  setClassError(state, payload) {
    state.class.error = payload
  }
}

export const actions = {
  async getClasses({ commit }, day) {
    await this.$axios
      .get(`gym/classes/all/?search=${day}&search_fields=day_of_week`)
      .then((response) => {
        if (response.status === 200) {
          commit('setClasses', response.data)
        }
      })
      .catch((e) => {
        commit('setError', e)
      })
  },
  async createClass({ commit }, data) {
    await this.$axios
      .post(`gym/classes/create/`, data)
      .then((response) => {
        if (response.status === 201) {
          commit('setSuccess', 'class has been successfully created')
        }
      })
      .catch((e) => {
        commit('setClassError', e)
      })
  },
  async deleteClass({ commit }, id) {
    await this.$axios
      .delete(`gym/classes/create/`, id)
      .then((response) => {
        if (response.status === 204) {
          commit('setSuccess', 'class has been successfully deleted')
        }
      })
      .catch((e) => {
        commit('setClassError', e)
      })
  }
}

export const getters = {
  sessions: (state) => state.classes,
  error: (state) => state.error,
  message: (state) => state.class.message,
  classError: (state) => state.class.error
}
