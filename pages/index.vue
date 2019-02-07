<template>
<div id="home" class="home" ref="main">

</div>
</template>

<script>
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
    this.data = wp.pages.home
  },
  mounted: function() {
    if (this.$store.state.fromRoute == null) this.mountAnimation(1.5)
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
</style>