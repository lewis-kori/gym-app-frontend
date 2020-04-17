<template>
  <div class="wobble animated mt-5">
    <b-alert variant="danger" dismissible show>
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  // eslint-disable-next-line vue/require-prop-types
  props: ['message']
}
</script>
