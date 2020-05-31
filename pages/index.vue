<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
      interval="4000"
    >
      <b-carousel-slide img-src="@/assets/images/img_bg_1.jpg"
        ><div class="row">
          <div class="col-sm-12 slider-text">
            <div class="carousel-caption slider-text-inner text-center">
              <h1>This is a Lifestyle There is no Finish Line</h1>
              <p>
                <a href="#" class="btn btn-primary btn-sm btn-learn"
                  >Join Classes</a
                >
              </p>
            </div>
          </div>
        </div></b-carousel-slide
      >
      <b-carousel-slide img-src="@/assets/images/img_bg_2.jpg"
        ><div class="container-fluid">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-md-offset-2 slider-text">
              <div class="slider-text-inner text-center">
                <h1>Don't Stop When it Hurts, Stop When You're Done</h1>
                <p>
                  <a href="#" class="btn btn-primary btn-sm btn-learn"
                    >Join Classes</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div></b-carousel-slide
      >
      <b-carousel-slide
        caption="Third Slide"
        img-src="@/assets/images/img_bg_3.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="fourth Slide"
        img-src="@/assets/images/img_bg_4.jpg"
      ></b-carousel-slide>
    </b-carousel>

    <div id="schedule" class="light-grey">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-6 col-md-offset-2 text-center">
            <h2>Our Class Schedule</h2>
            <p>
              Even the all-powerful Pointing has no control about the blind
              texts it is an almost unorthographic life One day however a small
              line of blind text by the name
            </p>
          </div>
        </div>
        <div class="row">
          <div class="schedule text-center bounceInDown animated">
            <div class="col-md-12">
              <ul class="week">
                <li
                  v-for="day_of_week in days"
                  :key="day_of_week.index"
                  :class="{ active: day == day_of_week }"
                  @click="getClasses(day_of_week)"
                >
                  <a>{{ day_of_week }}</a>
                </li>
              </ul>
            </div>
            <div v-if="sessions" class="schedule-flex">
              <div
                v-for="session in sessions"
                :key="session.id"
                class="entry-forth"
              >
                <GymSession :session="session" />
              </div>
            </div>
            <h3 v-else>{{ error }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="Trainers">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-md-offset-2 col-sm-8 text-center">
            <h2>Our Experienced Trainers</h2>
            <p>
              Even the all-powerful Pointing has no control about the blind
              texts it is an almost unorthographic life One day however a small
              line of blind text by the name
            </p>
          </div>
        </div>

        <div class="row">
          <template v-for="trainer in trainers">
            <div :key="trainer.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Trainer :on-delete="deleteRecipe" :trainer="trainer"></Trainer>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GymSession from '@/components/GymSession'
import Trainer from '@/components/Trainer'

export default {
  middleware: 'noProfile',
  components: {
    GymSession,
    Trainer
  },
  data() {
    return {
      day: '',
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  },
  computed: {
    ...mapGetters({
      sessions: 'classes/classes/sessions',
      error: 'classes/classes/error',
      trainers: 'trainers/trainer/trainers',
      trainer_error: 'trainers/trainer/errors'
    })
  },
  created() {
    const d = new Date()
    const dayIndex = d.getDay()
    this.getClasses(this.days[dayIndex])
    this.getTrainers()
  },
  methods: {
    getClasses(day) {
      try {
        this.$store.dispatch('classes/classes/getClasses', day)
        this.toggleActive(day)
      } catch (e) {
        this.error = e
      }
    },
    toggleActive(day) {
      this.day = day
    },
    ...mapActions({ getTrainers: 'trainers/trainer/getTrainers' })
  }
}
</script>

<style>
@import '@/assets/css/custom.css';
@import url('https://fonts.google.com/specimen/Poppins?selection.family=Poppins');
</style>
