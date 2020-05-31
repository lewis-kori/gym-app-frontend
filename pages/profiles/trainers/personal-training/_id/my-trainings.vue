<template>
  <div>
    <b-table hover :items="sessions" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  middleware: 'trainer',
  data() {
    return {
      sessions: null,
      fields: ['first_name', 'last_name', 'age']
    }
  },
  created() {
    this.getPersonalSessionRequests()
  },
  methods: {
    async getPersonalSessionRequests() {
      try {
        await this.$axios.get(`gym/personal-training/all/`).then((response) => {
          if (response.status === 200) {
            this.sessions = response.data
          }
        })
      } catch (e) {
        this.error = e.response.data
      }
    }
  }
}
</script>
