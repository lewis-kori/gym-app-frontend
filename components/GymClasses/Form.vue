<template>
  <div class="mt-5 container">
    <div class="row">
      <div class="col-md-12">
        <b-card>
          <b-card-body>
            <b-card-title class="text-center">Update class</b-card-title>
            <b-form method="post" @submit.prevent="updateSession">
              <b-form-group
                id="name-1"
                label="Class Name:"
                description="Give the class a descriptive class name."
                label-for="name"
              >
                <b-form-input
                  id="name"
                  v-model="session.name"
                  required
                  placeholder="please enter class name"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="cat"
                label-for="categories"
                label="Class category:"
              >
                <b-form-select
                  id="categories"
                  v-model="session.category"
                  required
                  :options="categories"
                >
                </b-form-select>
              </b-form-group>
              <b-form-group
                id="desc"
                label="Class Description:"
                label-for="description"
              >
                <b-form-textarea
                  id="description:"
                  v-model="session.description"
                  required
                  rows="3"
                  max-rows="6"
                  placeholder="please write what the class is about"
                ></b-form-textarea>
              </b-form-group>

              <div class="row">
                <div class="col-md-6">
                  <b-form-group
                    id="starttime"
                    label="Start time:"
                    label-for="starttime"
                    ><datetime
                      v-model.lazy="$v.session.start_time.$model"
                      type="datetime"
                      use12-hour
                      auto
                      :class="{
                        'col-md-6 form-control is-valid':
                          $v.session.start_time.timeMustBeAfter
                      }"
                      :state="$v.session.start_time.timeMustBeAfter"
                    ></datetime>
                    <!-- <b-form-invalid-feedback
                      v-if="!$v.session.start_time.timeMustBeAfter"
                      class="error"
                    >
                      That time has already passed.
                    </b-form-invalid-feedback> -->
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group
                    id="endtime"
                    label="End time:"
                    label-for="endttime"
                    ><datetime
                      v-model.lazy="$v.session.end_time.$model"
                      type="datetime"
                      use12-hour
                      auto
                      :class="{
                        'col-md-6 form-control is-valid':
                          $v.session.end_time.timeMustBeAfter
                      }"
                      :state="$v.session.end_time.timeMustBeAfter"
                    ></datetime>
                  </b-form-group>
                </div>
                <vue-google-autocomplete
                  id="map"
                  ref="address"
                  class="form-control m-3"
                  placeholder="Start typing"
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
import moment from 'moment'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
  components: {
    datetime: Datetime,
    VueGoogleAutocomplete
  },
  props: {
    session: {
      type: Object,
      default() {
        return {}
      }
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus()
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        await this.$axios.get(`gym/classes/categories/`).then((response) => {
          if (response.status === 200) {
            const categories = []
            response.data.forEach((category) => {
              const catDict = {
                text: category.name,
                value: category.id
              }
              categories.push(catDict)
            })
            this.categories = categories
          }
        })
      } catch (e) {
        if (e.response.data.detail) {
          this.$toast.info(e.response.data.detail)
        } else {
          this.$toast.error('Unable to retrieve categories at the moment')
        }
      }
    },
    async updateSession() {
      if (!this.$v.$invalid) {
        // const modifiedSession = this.session
        this.session.day_of_week = this.momentDayString(this.session.start_time)
        try {
          await this.$axios
            .patch(`gym/classes/retrieve/${this.session.id}/`, this.session)
            .then((response) => {
              if (response.status === 200) {
                this.$toast.success('class has successfully been updated', {
                  position: 'bottom-right',
                  iconPack: 'fontawesome',
                  icon: 'fa-check-circle',
                  duration: 3000
                })
                this.$router.push({
                  name: 'classes-id',
                  params: { id: response.data.id }
                })
              }
            })
        } catch (e) {
          this.$toast.error(
            'Oops, it appears there is an error, please try again.',
            {
              position: 'bottom-right',
              duration: 5000
            }
          )
        }
      }
    },
    getAddressData(addressData, placeResultData, id) {
      this.session.location =
        addressData.route +
        ', ' +
        addressData.administrative_area_level_1 +
        ', ' +
        addressData.country
    },
    momentDayString(date) {
      return moment(date).format('dddd')
    }
  },
  validations: {
    session: {
      start_time: {
        required,
        timeMustBeAfter(value) {
          const timeSet = moment(value)
          const today = moment()
          return timeSet.isAfter(today)
        }
      },
      end_time: {
        required,
        timeMustBeAfter(value) {
          const timeSet = moment(value)
          const startTime = moment(this.start_time)
          const today = moment()
          return timeSet.isAfter(today) && timeSet.isAfter(startTime)
        }
      }
    }
  }
}
</script>
