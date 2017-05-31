<template>
  <section class="container">
    <nuxt-link to="/">
      <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    </nuxt-link>
    <div>
      <nuxt-link class="button" to="/users">
        Users
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  import axios from '~plugins/axios'

  export default {
    async asyncData () {
      let {data} = await axios.get('/api/users')
      return {
        ids: data.ids,
        users: data.list
      }
    },
    head () {
      return {
        title: 'Users'
      }
    }
  }
</script>

<style scoped>
  .text-center {
    text-align: center;
  }

  .button {
    margin-top: 30px;
  }
</style>
