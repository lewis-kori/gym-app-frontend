<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <b-table
          hover
          responsive
          :busy="isBusy"
          :items="sessions"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          sort-icon-left
          :tbody-tr-class="rowClass"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              class="mr-1"
              variant="success"
              @click="info(row.item, row.index, $event.target)"
            >
              More
            </b-button>
          </template>
        </b-table>

        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          ref="more-info-modal"
          :title="infoModal.content.member"
          :request="selectedRequest"
          hide-footer
          scrollable
          size="xl"
          @hide="resetInfoModal"
        >
          <div>
            <b-card no-body class="overflow-hidden">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    :src="infoModal.content.gym_member_image"
                    :alt="infoModal.content.member"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body :title="infoModal.content.member">
                    <div class="row">
                      <div class="col-md-12 shadow-sm mr-2 ml-2">
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <th>Phone Number</th>
                              <td>{{ infoModal.content.gym_member_phone }}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{{ infoModal.content.gym_member_email }}</td>
                            </tr>
                            <tr>
                              <th>Location Name</th>
                              <td>{{ infoModal.content.location_name }}</td>
                            </tr>
                            <tr>
                              <th>Terms</th>
                              <td>{{ infoModal.content.terms }}</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td v-if="infoModal.content.is_accepted">
                                <span class="badge badge-success"
                                  >Accepted</span
                                >
                              </td>
                              <td v-else>
                                <span class="badge badge-warning">Pending</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
            <!-- start map section -->
            <b-row>
              <!--  -->
              <b-col class="md-12">
                <GmapMap
                  :center="{
                    lat: parseFloat(infoModal.content.position_lat),
                    lng: parseFloat(infoModal.content.position_lon)
                  }"
                  :zoom="17"
                  map-type-id="terrain"
                  class="map"
                >
                  <GmapCustomMarker
                    :marker="{
                      lat: parseFloat(infoModal.content.position_lat),
                      lng: parseFloat(infoModal.content.position_lon)
                    }"
                    alignment="bottomright"
                    @click="
                      center = {
                        lat: parseFloat(infoModal.content.position_lat),
                        lng: parseFloat(infoModal.content.position_lon)
                      }
                    "
                    ><img
                      src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                    />
                  </GmapCustomMarker>
                </GmapMap>
              </b-col>
            </b-row>
            <!-- end map section -->
            <b-row
              v-if="
                loggedInUser.role === 'Trainer' &&
                  !infoModal.content.is_accepted
              "
            >
              <b-col class="md-5">
                <b-button
                  class="mt-3"
                  variant="outline-warning"
                  block
                  @click="handleCancel(infoModal.content.requestId)"
                  >Decline</b-button
                >
              </b-col>
              <b-col class="md-5">
                <b-button
                  class="mt-3"
                  variant="outline-success"
                  block
                  @click="handleOk(infoModal.content.requestId)"
                  >Accept</b-button
                >
              </b-col>
            </b-row>

            <b-row v-else-if="infoModal.content.is_accepted">
              <b-col v-if="loggedInUser.role === 'Trainer'" class="md-12">
                <b-button
                  class="mt-3"
                  variant="outline-warning"
                  block
                  @click="handleTrainerCancel(infoModal.content.requestId)"
                  >Cancel</b-button
                >
              </b-col>
              <b-col v-else-if="loggedInUser.role === 'Member'" class="md-12">
                <b-button
                  class="mt-3"
                  variant="outline-warning"
                  block
                  @click="handleMemberCancel(infoModal.content.requestId)"
                  >Cancel</b-button
                >
              </b-col>
            </b-row>
          </div>
        </b-modal>
        <!-- end info modal -->

        <!-- start message modal -->
        <b-modal v-model="showMessageModal" ok-only>{{ message }}</b-modal>
        <!-- end message modal -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import { mapGetters } from 'vuex'

export default {
  middleware: 'myAuth',
  components: {
    GmapCustomMarker
  },
  data() {
    return {
      sessions: [],
      sortBy: 'created_at',
      sortDesc: false,
      fields: [
        { key: 'member', label: 'Member', sortable: true },
        { key: 'created_at', sortable: true },
        { key: 'start_time', sortable: true },
        { key: 'end_time', sortable: true },
        { key: 'location_name', label: 'location' },
        { key: 'actions', label: 'Actions' }
      ],
      isBusy: Boolean,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      message: '',
      showMessageModal: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    setTimeout(() => {
      this.getPersonalSessionRequests()
    }, 700)
  },
  methods: {
    async getPersonalSessionRequests() {
      try {
        await this.$axios.get(`gym/personal-training/all/`).then((response) => {
          this.isBusy = true
          if (response.status === 200) {
            response.data.forEach((request) => {
              let fullName = String

              if (request.gym_member.last_name) {
                fullName = `${request.gym_member.first_name} ${request.gym_member.last_name}`
              } else {
                fullName = `${request.gym_member.first_name}`
              }

              const reqDict = {
                member: `${fullName}`,
                created_at: this.moment(request.created_at),
                start_time: this.moment(request.start_time),
                end_time: this.moment(request.end_time),
                terms: request.terms,
                requestId: request.id,
                is_accepted: request.is_accepted,
                member_cancellation: request.member_cancellation,
                location_name: request.location_name,
                gym_member_image: request.gym_member.image,
                gym_member_email: request.gym_member.email,
                gym_member_phone: request.gym_member.phone_number,
                position_lat: request.lat,
                position_lon: request.lon
              }
              this.sessions.push(reqDict)
            })
            this.isBusy = !this.isBusy
          }
        })
      } catch (e) {
        this.error = e.response.data
      }
    },
    moment(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (!item.is_accepted) return 'table-warning'
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    async handleOk(requestId) {
      try {
        await this.$axios
          .post(`gym/personal-training/accept/`, {
            request_id: requestId,
            accept: 'true'
          })
          .then((response) => {
            if (response.status === 200) {
              this.$refs['more-info-modal'].hide()
              this.message = response.data.detail
              this.showMessageModal = true
              this.sessions = []
              this.getPersonalSessionRequests()
            }
          })
      } catch (e) {
        this.message = e.response.data.detail
        this.showMessageModal = true
      }
    },
    async handleTrainerCancel(requestId) {
      try {
        const deleteData = { request_id: requestId, accept: 'false' }

        await this.$axios
          .post(`gym/personal-training/accept/`, deleteData)
          .then((response) => {
            if (response.status === 200) {
              this.$refs['more-info-modal'].hide()
              this.message = response.data.detail
              this.showMessageModal = true
              this.sessions = []
              this.getPersonalSessionRequests()
            }
          })
      } catch (e) {
        this.message = e.response.data.detail
        this.showMessageModal = true
      }
    },
    async handleMemberCancel(requestId) {
      try {
        const deleteData = { request_id: requestId, member_cancellation: true }

        await this.$axios
          .post(`gym/personal-training/member/cancel/`, deleteData)
          .then((response) => {
            if (response.status === 200) {
              this.$refs['more-info-modal'].hide()
              this.message = response.data.detail
              this.showMessageModal = true
              this.sessions = []
              this.getPersonalSessionRequests()
            }
          })
      } catch (e) {
        this.message = e.response.data.detail
        this.showMessageModal = true
      }
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 50rem;
}
</style>
