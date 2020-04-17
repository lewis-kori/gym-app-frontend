<template>
  <section id="header">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center">Register!</h2>

          <Notification v-if="error" :message="error" />

          <b-form method="post" @submit.prevent="register">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="email"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email"
                v-model="auth.email"
                type="email"
                required
                placeholder="enter email"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="first name:"
              label-for="first-name"
            >
              <b-form-input
                id="first-name"
                v-model="auth.first_name"
                required
                placeholder="enter first name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="last name:"
              label-for="last-name"
            >
              <b-form-input
                id="last-name"
                v-model="auth.last_name"
                required
                placeholder="enter last name"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label="location:"
              label-for="location"
            >
              <b-form-input
                id="location"
                v-model="auth.location"
                placeholder="enter your address"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-7"
              label="Phone Number:"
              label-for="phoneNumber"
            >
              <b-form-input
                id="phoneNumber"
                v-model="auth.phone_number"
                placeholder="enter your phone number"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-6"
              label="password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="auth.password"
                placeholder="enter a strong secure password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="account type:"
              label-for="account-type"
            >
              <b-form-select
                id="account-type"
                v-model="auth.role"
                :options="accounts"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <b-form-file
                v-model="auth.image"
                name="image"
                :state="Boolean(auth.image)"
                accept="image/*"
                placeholder="Choose a profile picture..."
                drop-placeholder="Drop picture here..."
              ></b-form-file>
            </b-form-group>
            <b-button class="col-md-12" type="submit" variant="primary"
              >Register</b-button
            >
          </b-form>
          <div class="text-center" style="margin-top: 20px">
            Already got an account?
            <nuxt-link :to="{ name: 'auth-login' }">Login</nuxt-link>
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
      auth: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        role: '',
        location: '',
        image: null,
        password: ''
      },
      accounts: [
        { text: 'Account Type', value: null },
        { value: 'Trainer', text: 'Trainer' },
        { value: 'Member', text: 'Member' }
      ],
      error: '',
      preview: ''
    }
  },
  methods: {
    async register() {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const formData = new FormData()
        for (const data in this.auth) {
          formData.append(data, this.auth[data])
        }
        await this.$axios.post('auth/users/', formData, config)

        await this.$auth.loginWith('local', {
          data: {
            email: this.auth.email,
            password: this.auth.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data
      }
    }
  }
}
</script>
