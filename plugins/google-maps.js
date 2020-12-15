import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDXYPQoJp5PfiT6S8e27KHzvaMIpD58NRw',
    libraries: 'places',
    region: 'KE',
    language: 'EN'
  },
  installComponents: true
})
