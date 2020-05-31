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
              v-model="profile.description"
              required
              rows="3"
              max-rows="6"
              placeholder="please write a short description about yourself or any relevant information you might want us to know"
            >
            </b-form-textarea>
          </b-form-group>

          <b-form-group
            v-model="profile.specialities"
            label="what are your specialities"
          >
            <b-form-checkbox-group
              v-model="profile.specialities"
              :options="availableSpecialities"
            ></b-form-checkbox-group>
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
      profile: { description: '', specialities: [] },
      availableSpecialities: [],
      message: '',
      error: ''
    }
  },
  created() {
    this.getTrainerSpecialties()
  },
  methods: {
    async setProfile() {
      try {
        await this.$axios
          .post('users/trainers/profiles/', this.profile)
          .then((response) => {
            if (response.status === 201) {
              this.$router.push('/')
            }
          })
      } catch (e) {
        this.error = e.response.data
      }
    },
    async getTrainerSpecialties() {
      try {
        await this.$axios
          .get(`users/trainers/specialties/`)
          .then((response) => {
            if (response.status === 200) {
              response.data.forEach((speciality) => {
                const specialityDict = {
                  text: speciality.name,
                  value: speciality.id
                }
                this.availableSpecialities.push(specialityDict)
              })
            }
          })
      } catch (e) {
        this.error = e.response.data
      }
    }
  }
}
</script>
