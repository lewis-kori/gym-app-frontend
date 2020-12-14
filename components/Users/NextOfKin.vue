<template>
  <b-modal id="next-of-kin" @ok="addNextOfKin">
    <b-form method="post" @submit.prevent="addNextOfKin">
      <b-form-group id="input-group-1" label="First name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.firstName"
          placeholder="First name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Last name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.lastName"
          placeholder="Last name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Phone number:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.phoneNumber"
          placeholder="Phone number"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'NextOfKin',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    async addNextOfKin() {
      const data = {
        first_name: this.form.firstName,
        last_name: this.form.lastName,
        phone_number: this.form.phoneNumber
      }
      try {
        await this.$axios
          .post('users/members/next-of-kin/', data)
          .then((response) => {
            if (response.status === 201) {
              this.$toast.success('next of kin added')
              this.$emit('retrieve-NOK')
              this.$bvModal.hide('next-of-kin')
            }
          })
      } catch (e) {}
    }
  }
}
</script>
