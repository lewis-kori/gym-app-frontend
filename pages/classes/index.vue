<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container for-about"></div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <!-- <b-card-group> -->
        <b-card
          v-for="session in sessions"
          :key="session.id"
          class="col-lg-4 mb-2"
          ><img
            src="@/assets/images/img_bg_4.jpg"
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
              {{ session.description }}
            </b-card-text>
          </b-card-body>
        </b-card>

        <!-- </b-card-group> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessions: [],
      error: ''
    }
  },
  created() {
    this.getAllClasses()
  },
  methods: {
    async getAllClasses() {
      try {
        await this.$axios.get(`gym/classes/all/`).then((response) => {
          if (response.status === 200) {
            this.sessions = response.data
          }
        })
      } catch (e) {
        this.error = e.response.data.detail
      }
    }
  }
}
</script>

<style scoped>
.jumbotron {
  background-image: url('~@/assets/images/img_bg_2.jpg');
  background-size: cover;
  height: 100vh;
}
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
