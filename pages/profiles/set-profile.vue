<template>
  <div>
    <MemberProfileForm
      v-if="loggedInUser.role === 'Member'"
      :user="loggedInUser"
      @redirect-homepage="redirectHomePage"
    />
    <TrainerProfileForm
      v-if="loggedInUser.role === 'Trainer'"
      :user="loggedInUser"
      @redirect-homepage="redirectHomePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MemberProfileForm from '~/components/MemberProfileForm'
import TrainerProfileForm from '~/components/TrainerProfileForm'

export default {
  middleware: 'myAuth',
  components: {
    MemberProfileForm,
    TrainerProfileForm
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    redirectHomePage() {
      this.$store.commit('setProfile')
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>
