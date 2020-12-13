<template>
  <Form :session="session" />
</template>

<script>
import Form from '../../../components/GymClasses/Form'
export default {
  middleware: 'myAuth',
  components: { Form },
  asyncData({ $axios, params, error }) {
    return $axios
      .get(`gym/classes/retrieve/${params.id}/`)
      .then((response) => {
        return { session: response.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'not found' })
      })
  }
}
</script>
