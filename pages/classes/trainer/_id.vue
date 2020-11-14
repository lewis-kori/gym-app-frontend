<template>
  <div>
    <div class="container">
      <div v-if="loggedInUser.role === 'Trainer'" class="row">
        <div class="col-md-12 text-center mt-3">
          <nuxt-link :to="{ name: 'classes-new' }" class="btn btn-primary"
            >New class</nuxt-link
          >
        </div>
      </div>
      <div v-if="sessions.length > 0" class="row mt-5">
        <!-- <b-card-group> -->
        <b-card
          v-for="session in sessions"
          :key="session.id"
          class="col-lg-4 mb-2"
          ><img
            src="@/assets/images/img_bg_3.jpg"
            class="card-img-top"
            alt="ok"
          />
          <b-card-body>
            <b-card-title
              ><nuxt-link
                :to="{ name: 'classes-id', params: { id: session.id } }"
                >{{ session.name }}</nuxt-link
              ></b-card-title
            >
            <b-card-text>
              {{ shortenText(session.description) }}
            </b-card-text>
          </b-card-body>
        </b-card>

        <!-- </b-card-group> -->
      </div>
      <div v-else class="mx-auto my-auto">
        <b-card
          class="mx-auto h-50 w-50"
          img-src="https://res.cloudinary.com/lewiskori/image/upload/v1604402655/gym%20app/empty_inbox__p6epq1.svg"
          img-top
          style="margin-top:14rem;"
          title="Trainer doesn't have classes yet"
        ></b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      sessions: [],
      error: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    this.getTrainerClasses(this.$route.params.id)
  },
  methods: {
    async getTrainerClasses(trainerId) {
      try {
        await this.$axios
          .get(`gym/classes/trainer/${trainerId}/`)
          .then((response) => {
            if (response.status === 200) {
              this.sessions = response.data
            }
          })
      } catch (e) {
        this.error = e.response.data.detail
      }
    },
    shortenText(text) {
      return text.slice(0, 200) + '...'
    }
  }
}
</script>

<style scoped>
.btn-primary {
  background: #dc2f2f !important;
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
