<template>
<div id="about" class="about" ref="main">
</div>
</template>

<script>
import api from '~/api/data.json'
import { TimelineMax } from 'gsap'

export default {
  name: 'Home',
  head: {
    title: `Gabriel Stik — Portfolio`
  },
  data() {
    return {
      data: {}
    }
  },
  created: function() {
    this.data = api.home
  },
  mounted: function() {
    if (this.$store.state.fromRoute == null) this.mountAnimation(.7)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)
  },
  beforeRouteLeave: function(to, from, next) {
    next()
  },
  methods: {
    mountAnimation: function(delay) {
    }
  }
}
</script>

<style lang="scss" scoped>
#about {
  min-height: 100vh;
  background-color: var(--main);
}
</style>