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
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
        >
          <pre>{{ infoModal.content }}</pre>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  middleware: 'trainer',
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
      }
    }
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
                is_accepted: request.is_accepted,
                location_name: request.location_name
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
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    }
  }
}
</script>
