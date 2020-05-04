<template>
  <div>
    <div>
      <b-jumbotron
        header="BootstrapVue"
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
        <b-alert v-model="showAlert" variant="success" dismissible>
          {{ message }}
        </b-alert>
        <b-card style="background-color:#1E2022; color:grey;">
          <b-card-body>
            <p>
              StartTime:
              {{ session.start_time | moment('dddd, MMMM, h:mm:ss') }}
            </p>
            <p>
              EndTime: {{ session.end_time | moment('dddd, MMMM, h:mm:ss') }}
            </p>
            <p>type: {{ session.category.name }}</p>
            <p
              class="btn btn-primary"
              style="display: block;"
              @click="bookSession(session.id)"
            >
              Book now
            </p>
          </b-card-body>
        </b-card>
        <!-- trainer pic -->
        <nuxt-link
          :to="{ name: 'profiles-id', params: { id: session.trainer.id } }"
        >
          <b-card
            title="Class Trainer"
            style="background-color:#1E2022; color:white; margin-top: 3rem;"
          >
            <b-card-body>
              <b-img-lazy :src="session.trainer.image" fluid></b-img-lazy>
            </b-card-body>
            <b-card-text>{{ session.trainer.first_name }}</b-card-text>
          </b-card>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
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
      error: null,
      message: null,
      showAlert: false,
      image: {
        backgroundImage: `url(https://res.cloudinary.com/practicaldev/image/fetch/s--u_69avF7--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--GjyFBfuC--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/e9lyg282f6wxcu8rmd3y.jpg)`
      }
    }
  },
  methods: {
    async bookSession(id) {
      try {
        await this.$axios
          .post(`gym/attendance/create/${id}/`)
          .then((response) => {
            if (response.status === 201) {
              this.message = 'class has been created'
              this.showAlert = true
            }
          })
      } catch (e) {
        this.error = 'oops there was an error'
      }
    }
  }
}
</script>

<style scoped>
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
