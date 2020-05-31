<template>
  <section id="header" class="mt-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center">Welcome {{ error }}!</h2>

          <Notification v-if="error" :message="error" />

          <b-form method="post" @submit.prevent="login">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="email"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="enter email"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                placeholder="enter password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button class="col-md-12" type="submit" variant="primary"
              >Login</b-button
            >
          </b-form>
          <div class="text-center" style="margin-top: 20px">
            Don't have an account?
            <nuxt-link :to="{ name: 'auth-register' }">register</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '@/components/Notification'
export default {
  components: {
    Notification
  },
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        if (e.response.status === 400) {
          this.error = e.response.data.non_field_errors
        }
      }
    }
  }
}
</script>
