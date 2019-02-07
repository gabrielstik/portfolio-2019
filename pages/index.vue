<template>
<div id="home" class="home" ref="main">
  <h1 class="title">{{data.title}}</h1>
  <p class="text">{{data.text}}</p>
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
    if (this.$store.state.fromRoute == null) this.mountAnimation(1.5)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)

    console.log(this.api)
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
#home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: var(--background);
}

.title {
  font-family: 'PTSerif', serif;
  font-size: 100px;
  color: var(--main);
  letter-spacing: 0;
  text-align: center;
}

.text {
  width: 440px;
  margin: 44px auto;
  font-family: 'Maison Neue', sans-serif;
  font-size: 18px;
  color: var(--grey);
  letter-spacing: 0;
  text-align: center;
  line-height: 33px;
}
</style>