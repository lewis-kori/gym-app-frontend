<template>
  <div>
    <div class="row">
      <b-form method="post" @submit.prevent="updateUserPassword">
        <b-form-row class="mb-2">
          <b-col cols="12" size="sm">
            <b-form-group
              ref="old-password"
              label-size="sm"
              label="Current Password:"
            >
              <b-form-input
                v-model="user.currentPassword"
                size="sm"
                type="password"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="12">
            <b-form-group
              ref="new-password"
              label-size="sm"
              label="New Password:"
            >
              <b-form-input
                v-model="user.newPassword"
                size="sm"
                type="password"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-button class="w-100" size="sm" variant="success" type="submit"
              ><span class="mx-auto">Update Password</span></b-button
            >
          </b-col>
        </b-form-row>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordChange',
  data() {
    return {
      user: {
        currentPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    async updateUserPassword() {
      const data = {
        current_password: this.user.currentPassword,
        new_password: this.user.newPassword
      }
      try {
        await this.$axios
          .post('auth/users/set_password/', data)
          .then((response) => {
            if (response.status === 204) {
              this.$toast.success('Password updated successfully!')
            }
          })
      } catch (e) {
        if (e.response.data.detail) {
          this.$toast.info(e.response.data.detail)
        } else {
          this.$toast.error('Could not update password at this time')
        }
      }
    }
  }
}
</script>
