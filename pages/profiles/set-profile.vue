<template>
  <div>
    <MemberProfileForm
      v-if="loggedInUser.role === 'Member'"
      :user="loggedInUser"
    />
    <TrainerProfileForm
      v-if="loggedInUser.role === 'Trainer'"
      :user="loggedInUser"
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
  }
}
</script>
