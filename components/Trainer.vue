<template>
  <nuxt-link :to="{ name: 'profiles-trainers-id', params: { id: trainer.id } }">
    <div class="card recipe-card">
      <img :src="trainer.image" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">
          {{ trainer.first_name }} {{ trainer.last_name }}
        </h5>
        <p>{{ profile.description }}</p>
        <hr />
        <p class="card-text">
          <strong>Specialities:</strong>
          <span
            v-for="speciality in profile.specialities"
            :key="speciality.id"
            class="badge badge-pill badge-info mr-1"
          >
            {{ speciality.name }}
          </span>
        </p>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Trainer',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    trainer: Object
  },
  data() {
    return {
      sem: Object
    }
  },
  computed: {
    ...mapGetters({
      profile: 'trainers/trainer/profile'
    })
  },
  created() {
    this.getTrainerProfile(this.trainer.id)
  },
  methods: {
    ...mapActions({ getTrainerProfile: 'trainers/trainer/getTrainerProfile' })
  }
}
</script>

<style scoped>
.recipe-card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}
a {
  color: #5a5656 !important;
  position: relative;
}
a:hover {
  color: #000000 !important;
  position: relative;
  text-decoration: none;
}
</style>
