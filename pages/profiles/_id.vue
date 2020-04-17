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
                {{ this.$route.name == 'profiles-id' }}
              </div>
            </div>
          </template>
        </div>
      </b-jumbotron>
    </div>

    <div class="row activity">
      <div class="col-md-12">
        <b-card class="text-left ml-5 w-50"
          ><b-card-body>
            <span class="float-left mr-2"><i class="fas fa-signal"></i></span
            ><b-card-text
              >stats
              <span class="float-right"><i class="fas fa-angle-right"></i></span
            ></b-card-text>
            <hr />
            <span class="float-left mr-2"
              ><i class="fas fa-chart-line"></i></span
            ><b-card-text
              >Trainings
              <span class="float-right"><i class="fas fa-angle-right"></i></span
            ></b-card-text> </b-card-body
        ></b-card>
      </div>
    </div>
    <div class="row activity mt-5">
      <div class="col-md-12">
        <b-card class="text-left ml-5 w-50"
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      profile: Object,
      image: {
        backgroundImage: `url(http://127.0.0.1:8000/media/user_pics/milkshake_LgGZ6Ic.png)`
      }
    }
  },
  computed: {
    ...mapGetters({ getProfile: 'trainers/trainer/getProfile' })
  },
  created() {
    this.profile = this.getProfile(this.$route.params.id)
  }
}
</script>

<style scoped>
.top-section {
  position: relative;
}
.activity {
  top: -19%;
  position: relative;
  z-index: 20;
  /* background: red; */
}
.jumbotron {
  height: 60vh;
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
</style>
