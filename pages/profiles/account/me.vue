<template>
  <div class="container">
    <div class="mb-2 mt-4">
      <div>
        <ul class="nav nav-pills">
          <li class="nav-item hoverable">
            <span :class="[{ active: activeTab === 'profile' }, 'nav-link']"
              ><span @click="switchActiveTab('profile')">Account</span></span
            >
          </li>
          <li class="nav-item hoverable">
            <span :class="[{ active: activeTab === 'password' }, 'nav-link']"
              ><span @click="switchActiveTab('password')"
                >Change Password</span
              ></span
            >
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <div v-if="activeTab === 'profile'">
      <Profile class="ml-1" :user="loggedInUser" />
    </div>
    <b-row v-else-if="activeTab === 'password'" class="mb-3">
      <b-col cols="6" md="3">
        <PasswordChange />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '../../../components/Users/Profile'
import PasswordChange from '../../../components/Users/PasswordChange'
export default {
  middleware: 'auth',
  components: { Profile, PasswordChange },
  data() {
    return {
      activeTab: 'profile'
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    switchActiveTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>
