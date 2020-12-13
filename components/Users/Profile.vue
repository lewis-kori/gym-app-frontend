<template>
  <div>
    <div class="row">
      <b-form method="post" @submit.prevent="updateUserProfile">
        <div class="d-flex mb-3">
          <figure class="mr-3">
            <img
              v-if="user.image"
              width="80"
              class="rounded-pill"
              :src="user.image"
              :alt="user.first_name"
            />
            <img
              v-else
              width="80"
              class="rounded-pill"
              src="https://picsum.photos/200/200.webp"
              :alt="user.first_name"
            />
          </figure>
          <div>
            <p>{{ user.first_name }} {{ user.last_name }}</p>
          </div>
        </div>
        <div>
          <b-form-row class="mb-2">
            <b-col cols="6" size="sm">
              <b-form-group
                ref="first-name"
                label-size="sm"
                label="First Name:"
              >
                <b-form-input
                  v-model="user.first_name"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                ref="second-name"
                label-size="sm"
                label="Second Name:"
              >
                <b-form-input v-model="user.last_name" size="sm"></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="6">
              <b-form-group ref="email" label-size="sm" label="Email:">
                <b-form-input
                  v-model="user.email"
                  type="email"
                  required
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group ref="status" label-size="sm" label="Status:">
                <b-form-select
                  v-model="user.is_active"
                  :options="activeOptions"
                  size="sm"
                  disabled
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2">
            <b-col cols="6">
              <b-form-group ref="role" label-size="sm" label="Role:">
                <b-form-select
                  v-model="user.role"
                  :options="roleOptions"
                  size="sm"
                  disabled
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                ref="phoneNumber"
                label-size="sm"
                label="Phone Number:"
              >
                <b-form-input
                  v-model="user.phone_number"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2"> </b-form-row>
          <b-form-row> </b-form-row>
          <b-form-row>
            <b-col>
              <b-button class="w-100" size="sm" variant="success" type="submit"
                ><span class="mx-auto">Save changes</span></b-button
              >
            </b-col>
          </b-form-row>
        </div>
      </b-form>
    </div>
    <b-modal id="avatar-modal">
      <b-form-group
        label="Upload profile pic:"
        label-for="avatar-upload"
        label-cols-sm="2"
      >
        <b-form-file
          id="avatar-upload"
          v-model="picture"
          accept=".jpg, .jpeg, .png, .gif"
        ></b-form-file>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      picture: '',
      activeOptions: [
        { value: true, text: 'Active' },
        { value: false, text: 'Blocked' }
      ],
      roleOptions: [
        { value: '', text: 'Role' },
        { value: 'Admin', text: 'Admin' },
        { value: 'Member', text: 'Member' },
        { value: 'Trainer', text: 'Trainer' }
      ],
      genderOptions: [
        { value: '', text: 'Gender' },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
      ]
    }
  },
  methods: {
    async updateUserProfile() {
      try {
        await this.$axios
          .patch('auth/users/me/', this.user)
          .then((response) => {
            if (response.status === 200) {
              this.$toast.success('Profile updated successfully!')
            }
          })
      } catch (e) {
        if (e.response.data.detail) {
          this.$toast.info(e.response.data.detail)
        } else {
          this.$toast.error('Could not update profile at this time')
        }
      }
    }
  }
}
</script>
