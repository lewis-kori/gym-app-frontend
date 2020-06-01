<template>
  <div id="schedule" class="light-grey">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-6 col-md-offset-2 text-center">
          <h2>Our Class Schedule</h2>
          <p>
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic life One day however a small line of
            blind text by the name
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
</template>

<script>
import { mapGetters } from 'vuex'
import GymSession from '@/components/GymSession'
export default {
  components: {
    GymSession
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
      sessions: 'classes/classes/sessions'
    })
  },
  created() {
    const d = new Date()
    const dayIndex = d.getDay()
    this.getClasses(this.days[dayIndex])
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
    }
  }
}
</script>
