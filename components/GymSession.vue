<template>
  <div class="fadeInRight animated">
    <p class="icon">
      <span><i class="flaticon-gym"></i></span>
    </p>
    <p class="time">
      <span>{{ session.start_time }}- {{ session.end_time }}</span>
    </p>
    <h3>{{ session.name }}</h3>
    <p class="trainer">
      <span>{{ session.trainer }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    session: Object
  }
}
</script>
