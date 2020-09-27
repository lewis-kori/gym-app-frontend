<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">
          Time to set your profile {{ user.first_name }}!
        </h2>

        <Notification v-if="error" :message="error" />

        <b-form method="POST" @submit.prevent="setProfile">
          <b-form-group label="Describe yourself:">
            <b-form-textarea
              v-model="description"
              required
              rows="3"
              max-rows="6"
              placeholder="please write a short description about yourself or any relevant information you might want us to know"
            >
            </b-form-textarea>
          </b-form-group>
          <b-button class="col-md-12" type="submit" variant="primary"
            >Submit</b-button
          >
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from './Notification'

export default {
  name: 'MemberProfile',
  components: {
    Notification
  },
  props: {
    user: {
      default() {
        return { first_name: 'Member' }
      },
      type: Object
    }
  },
  data() {
    return {
      description: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async setProfile() {
      try {
        await this.$axios
          .post('users/members/create/', { description: this.description })
          .then((response) => {
            if (response.status === 201) {
              this.$emit('redirect-homepage')
            }
          })
      } catch (e) {
        this.error = e.response.data
      }
    }
  }
}
</script>
