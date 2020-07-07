<template>
  <div class="mt-5 container">
    <div class="row">
      <div class="col-md-12">
        <b-card>
          <b-card-body>
            <b-card-title class="text-center">Booking Trainer</b-card-title>
            <b-form method="post" @submit.prevent="createSession">
              <b-alert v-if="message" show variant="success">{{
                message
              }}</b-alert>
              <b-alert v-if="error" show variant="warning">{{ error }}</b-alert>

              <b-form-group id="termsLabel" label="Terms:" label-for="terms">
                <b-form-textarea
                  id="terms:"
                  v-model="session.terms"
                  required
                  rows="3"
                  max-rows="6"
                  placeholder="Give the trainer some information before they arrive"
                ></b-form-textarea>
              </b-form-group>

              <div class="row">
                <div class="col-md-6">
                  <b-form-group
                    id="starttime"
                    label="Start time:"
                    label-for="starttime"
                    ><datetime
                      v-model="session.start_time"
                      type="datetime"
                      use12-hour
                      auto
                    ></datetime>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group
                    id="endtime"
                    label="End time:"
                    label-for="endttime"
                    ><datetime
                      v-model="session.end_time"
                      type="datetime"
                      use12-hour
                      auto
                    ></datetime>
                  </b-form-group>
                </div>
                <vue-google-autocomplete
                  id="map"
                  ref="address"
                  :country="['ke', 'tz', 'ug']"
                  class="form-control m-3"
                  placeholder="Location of where the trainer should come."
                  @placechanged="getAddressData"
                >
                </vue-google-autocomplete>
              </div>
              <b-button class="col-md-12" type="submit" variant="primary"
                >Submit</b-button
              >
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  middleware: 'myAuth',
  components: {
    datetime: Datetime,
    VueGoogleAutocomplete
  },
  data() {
    return {
      session: {
        terms: '',
        start_time: '',
        end_time: '',
        location_name: '',
        lon: null,
        lat: null,
        gym_trainer: null
      },
      message: null,
      error: null
    }
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus()
    this.session.gym_trainer = this.$route.params.id
  },
  methods: {
    async createSession() {
      try {
        await this.$axios
          .post(`gym/personal-training/create/`, this.session)
          .then((response) => {
            if (response.status === 201) {
              this.message = 'Request has successfully been sent.'
            }
          })
      } catch (e) {
        this.error = 'Oops there is an error'
      }
    },
    getAddressData(addressData, placeResultData, id) {
      this.session.location_name =
        addressData.route +
        ', ' +
        addressData.administrative_area_level_1 +
        ', ' +
        addressData.country
      this.session.lat = addressData.latitude
      this.session.lon = addressData.longitude
    }
  }
}
</script>
