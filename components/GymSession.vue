<template>
  <nuxt-link :to="{ name: 'classes-id', params: { id: session.id } }">
    <div class="fadeInRight animated">
      <p class="icon">
        <span><i class="flaticon-gym"></i></span>
      </p>
      <p class="time">
        <span
          >{{ session.start_time | moment('dddd, h:mm:ss') }}-
          {{ session.end_time | moment('dddd, h:mm:ss') }}</span
        >
      </p>
      <h3>{{ session.name }}</h3>
      <p class="trainer">
        <span>{{ session.trainer }}</span>
      </p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'GymSession',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    session: Object
  }
}
</script>

<style scoped>
a {
  color: black !important;
}
a:hover {
  text-decoration: none !important;
  text-decoration-color: none;
}
</style>
