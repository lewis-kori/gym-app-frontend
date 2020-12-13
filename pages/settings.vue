<template>
  <div class="container">
    <P>
      <NuxtLogo />
    </P>

    <ColorModePicker />
  </div>
</template>

<script>
import ColorModePicker from '../components/Settings/ColormodePicker'
import NuxtLogo from '../components/Settings/NuxtLogo'
export default {
  components: { ColorModePicker, NuxtLogo },
  head: {
    title: 'Switch theme'
  }
}
</script>

<style scoped>
p {
  padding: 20px 0;
  margin: 0;
}
.container {
  text-align: center;
  padding: 50px;
}
</style>
