<template>
  <div>
    <header>
      <b-navbar
        :class="{
          'fixed-top': this.$route.name == 'profiles-id',
          'bg-dark': this.$route.name != 'profiles-id'
        }"
        toggleable="lg"
        type="dark"
      >
        <div class="container">
          <b-navbar-brand class="personal-logo"
            ><nuxt-link to="/">Gymie</nuxt-link></b-navbar-brand
          >

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item><nuxt-link to="/">Home</nuxt-link></b-nav-item>
              <b-nav-item
                ><nuxt-link :to="{ name: 'classes' }"
                  >Classes</nuxt-link
                ></b-nav-item
              >
              <b-nav-item
                ><nuxt-link :to="{ name: 'auth-register' }"
                  >Schedule</nuxt-link
                ></b-nav-item
              >
              <b-nav-item>Trainers</b-nav-item>
              <b-nav-item>Contact</b-nav-item>
              <b-nav-item-dropdown v-if="isAuthenticated" right
                ><template v-slot:button-content>
                  {{ loggedInUser.first_name }}
                </template>
                <b-dropdown-item href="#">training history</b-dropdown-item>
                <b-dropdown-item>
                  <nuxt-link
                    v-if="loggedInUser.role === 'Member'"
                    :to="{
                      name: 'profiles-members-id',
                      params: { id: loggedInUser.id }
                    }"
                    >profile</nuxt-link
                  >
                  <nuxt-link
                    v-else-if="loggedInUser.role === 'Trainer'"
                    :to="{
                      name: 'profiles-trainers-id',
                      params: { id: loggedInUser.id }
                    }"
                    >profile</nuxt-link
                  >
                </b-dropdown-item>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item v-else :to="{ name: 'auth-login' }">Login</b-nav-item>
              <!-- <b-nav-item @click="logout">Logout</b-nav-item> -->
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.nuxt-link-exact-active.nuxt-link-active {
  color: #dc2f2f !important;
  position: relative;
}
a {
  color: #e0d9d9 !important;
  position: relative;
}
a:hover {
  color: #dc2f2f !important;
  position: relative;
  text-decoration: none;
}
.navbar .navbar-collapse {
  text-align: center;
}
</style>

// use fixed=top when i need it clear
