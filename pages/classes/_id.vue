<template>
  <div>
    <div>
      <b-jumbotron
        :header="session.name"
        lead="Be the best you can be"
        :style="image"
      >
        <nuxt-link
          :to="{
            name: 'classes-trainer-id',
            params: { id: session.trainer.id }
          }"
          ><b-button variant="primary">Similar classes</b-button></nuxt-link
        >
      </b-jumbotron>
    </div>

    <!-- class area -->
    <div class="row">
      <div class="col-md-7 ml-3">
        <b-img
          src="https://picsum.photos/1024/400/?image=41"
          fluid-grow
          alt="Responsive image"
        ></b-img>

        <h3>{{ session.name }}</h3>
        <p>{{ session.description }}</p>
      </div>

      <div class="col-md-4 mr-2">
        <b-card style="">
          <b-card-body>
            <p>
              StartTime:
              {{ session.start_time | moment('dddd, MMMM, h:mm:ss') }}
            </p>
            <p>
              EndTime: {{ session.end_time | moment('dddd, MMMM, h:mm:ss') }}
            </p>
            <p>type: {{ session.category.name }}</p>
            <b-row v-if="loggedInUser.role === 'Member'">
              <b-col class="md-12">
                <p
                  v-if="session.current_user_booked"
                  class="btn btn-primary"
                  style="display: block;"
                  @click="cancelSession(session.id)"
                >
                  Cancel Booking
                </p>
                <p
                  v-else
                  class="btn btn-primary"
                  style="display: block;"
                  @click="bookSession(session.id)"
                >
                  Book Now
                </p>
              </b-col>
            </b-row>
            <!-- trainer buttons -->
            <b-row v-else-if="loggedInUser.role === 'Trainer'">
              <b-col class="md-5">
                <b-button
                  class="btn"
                  variant="outline-success"
                  @click="bookSession(session.id)"
                >
                  Edit
                </b-button>
              </b-col>

              <b-col class="md-5">
                <b-button
                  class="btn"
                  variant="outline-warning"
                  @click="toggleConfirmDelete"
                >
                  Delete
                </b-button>
              </b-col>
              <!-- end trainer button -->
            </b-row>
            <!-- start booking display to anuthenticates users -->
            <b-row v-else>
              <b-col>
                <p
                  class="btn btn-primary"
                  style="display: block;"
                  @click="$router.push({ name: 'auth-login' })"
                >
                  Book Now
                </p>
              </b-col>
            </b-row>
            <!-- end display to unauthenticated users -->
          </b-card-body>
        </b-card>
        <!-- trainer pic -->
        <nuxt-link
          :to="{
            name: 'profiles-trainers-id',
            params: { id: session.trainer.id }
          }"
        >
          <b-card class="trainer" title="Class Trainer">
            <b-card-body>
              <b-img-lazy :src="session.trainer.image" fluid></b-img-lazy>
            </b-card-body>
            <b-card-text>{{ session.trainer.first_name }}</b-card-text>
          </b-card>
        </nuxt-link>
      </div>
    </div>
    <b-modal v-model="confirmDelete" size="sm"
      >Are you sure you want to delete the class?😕 Members will be notified if
      you confirm this action.
      <template v-slot:modal-footer="{}">
        <b-button size="sm" variant="success" @click="toggleConfirmDelete">
          Cancel
        </b-button>
        <b-button size="sm" variant="danger" @click="deleteSession(session.id)">
          confirm
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ $axios, params, error }) {
    return $axios
      .get(`gym/classes/retrieve/${params.id}/`)
      .then((response) => {
        return { session: response.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'not found' })
      })
  },
  data() {
    return {
      image: {
        backgroundImage: `url(https://res.cloudinary.com/practicaldev/image/fetch/s--u_69avF7--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--GjyFBfuC--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/e9lyg282f6wxcu8rmd3y.jpg)`
      },
      confirmDelete: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    async bookSession(id) {
      try {
        await this.$axios
          .post(`gym/attendance/create/${id}/`)
          .then((response) => {
            if (response.status === 201) {
              this.$router.push({
                name: 'classes-id',
                params: { id: this.session.id }
              })
              this.$toast.success(response.data.detail, {
                iconPack: 'fontawesome',
                icon: 'fa-check-circle',
                position: 'bottom-right',
                duration: 2000
              })
            }
          })
      } catch (e) {
        this.$toast.error(e.response.data.detail, {
          position: 'bottom-right',
          duration: 2000
        })
      }
    },
    async cancelSession(id) {
      try {
        await this.$axios
          .post(`gym/attendance/cancel/`, { class_id: id })
          .then((response) => {
            if (response.status === 202) {
              this.$router.push({
                name: 'classes-id',
                params: { id: this.session.id }
              })
              this.$toast.success(response.data.detail, {
                iconPack: 'fontawesome',
                icon: 'fa-check-circle',
                position: 'bottom-right',
                duration: 2000
              })
            }
          })
      } catch (e) {
        this.$toast.error(e.response.data.detail, {
          position: 'bottom-right',
          duration: 2000
        })
      }
    },
    async deleteSession(id) {
      this.toggleConfirmDelete()
      this.$toast.info('deleting class', {
        iconPack: 'fontawesome',
        icon: 'fa-hourglass-half',
        position: 'bottom-right',
        duration: 2000
      })
      try {
        await this.$axios
          .delete(`gym/classes/delete/${id}/`)
          .then((response) => {
            if (response.status === 204) {
              this.$toast.success('class deleted', {
                iconPack: 'fontawesome',
                icon: 'fa-check-circle',
                position: 'bottom-right',
                duration: 2000
              })
              setTimeout(() => {
                this.$router.push({
                  name: 'classes-trainer-id',
                  params: { id: this.session.trainer.id }
                })
              }, 100)
            }
          })
      } catch (e) {
        this.$toast.error(e.response.data.detail, {
          position: 'bottom-right',
          duration: 2000
        })
      }
    },
    toggleConfirmDelete() {
      this.confirmDelete = !this.confirmDelete
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #1e2022;
  color: grey;
}
.trainer {
  margin-top: 3rem;
  color: white;
}
.btn-primary {
  background: #dc2f2f;
  color: #fff;
  border: 2px solid #dc2f2f;
}
.btn {
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 15px;
  font-weight: 400;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -ms-border-radius: 30px;
  border-radius: 30px;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
  padding: 8px 20px;
}
</style>
