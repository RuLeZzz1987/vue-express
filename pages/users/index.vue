<template>
  <section class="container">
    <nuxt-link to="/">
      <img src="../../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    </nuxt-link>
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="userId in ids" class="user">
        <nuxt-link :to="{ path: `/users/${userId}`}">
          {{ users[userId].name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/users')
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
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
