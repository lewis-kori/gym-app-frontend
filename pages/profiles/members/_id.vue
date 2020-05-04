<template>
  <div>
    <div class="top-section">
      <b-jumbotron :style="image" class="jumbotron">
        <div class="jumbotron-content">
          <h1>{{ profile.user.first_name }}</h1>
          <template>
            <div class="row justify-content-left">
              <div class="col-md-3">{{ profile.user.role }}</div>
              <div class="col-md-3">
                {{ this.$route.name == 'profiles-members-id' }}
              </div>
            </div>
          </template>
        </div>
      </b-jumbotron>
    </div>

    <div class="row activity">
      <div class="col-md-12 ">
        <b-card class="text-left ml-auto mr-auto w-50">
          <b-card-body v-if="profile.user.role === 'Member'">
            <span class="float-left mr-2"><i class="fas fa-signal"></i></span
            ><nuxt-link :to="{ name: 'profiles-members-stats' }"
              ><b-card-text
                >stats
                <span class="float-right"
                  ><i class="fas fa-angle-right"></i></span
              ></b-card-text>
              <hr />
              <span class="float-left mr-2"
                ><i class="fas fa-chart-line"></i></span></nuxt-link
            ><b-card-text
              >Trainings
              <span class="float-right"><i class="fas fa-angle-right"></i></span
            ></b-card-text>
          </b-card-body>
          <b-card-body v-else>
            <span class="float-left mr-2"><i class="fas fa-signal"></i></span
            ><nuxt-link
              :to="{
                name: 'classes-trainer-id',
                params: { id: profile.user.id }
              }"
              ><b-card-text
                >My classes
                <span class="float-right"
                  ><i class="fas fa-angle-right"></i></span></b-card-text
            ></nuxt-link>
            <hr />
            <span class="float-left mr-2"
              ><i class="fas fa-chart-line"></i></span
            ><b-card-text
              >My Trainings
              <span class="float-right"><i class="fas fa-angle-right"></i></span
            ></b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <b-card class="text-left ml-auto mr-auto w-50"
          ><b-card-body>
            <span class="float-left mr-2"><i class="fas fa-user-alt"></i></span
            ><b-card-text
              >account
              <span class="float-right"><i class="fas fa-angle-right"></i></span
            ></b-card-text>
            <hr />
            <span class="float-left mr-2"><i class="fas fa-user-cog"></i></span
            ><b-card-text
              >settings
              <span class="float-right"><i class="fas fa-angle-right"></i></span
            ></b-card-text> </b-card-body
        ></b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $axios, params, error }) {
    return $axios
      .get(`users/members/retrieve/${params.id}/`)
      .then((response) => {
        if (response.status === 200) {
          return { profile: response.data }
        }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'not found' })
      })
  },
  data() {
    return {
      image: {
        backgroundImage: `url(https://res.cloudinary.com/lewiskori/image/upload/v1588417374/gym%20app/ryan-de-hamer-WIPIAJW2-P8-unsplash_wem52x.jpg)`
      }
    }
  }
}
</script>

<style scoped>
.top-section {
  position: relative;
}
.activity {
  margin-top: -6%;
  position: relative;
  z-index: 20;
}
.jumbotron {
  height: 70vh;
  background-repeat: no-repeat;
  background-size: cover;
}
.jumbotron-content {
  top: 75%;
  position: relative;
  transform: translateY(-20);
}
.card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}
a {
  color: black !important;
}
a:hover {
  text-decoration: none !important;
  text-decoration-color: none;
}
</style>
