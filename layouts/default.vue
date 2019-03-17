<template>
  <div class="globalContainer">
    <Header/>
    <main class="main">
      <nuxt/>
      <div class="cursor" ref="cursor"></div>
      <div class="loader" ref="loader">
      </div>
    </main>
  </div>
</template>

<script>
import Header from '~/components/Header';
import { TweenMax } from 'gsap'

export default {
  components: {
    Header
  },
  mounted: function() {
    if (!Modernizr.touchevents) this.initCursor()
    this.loader()
  },
  methods: {
    initCursor: function() {
      const $cursor = this.$refs.cursor
      window.addEventListener('mousemove', (e) => {
        TweenMax.to($cursor, .3, { x: `${e.clientX - 4}px`, y: `${e.clientY - 4}px`, ease: Power1.easeOut })
      })
    },
    loader: function() {
      const timeline = new TimelineMax
      timeline
        .to(this.$refs.loader, 1, { y: '-100vh', ease: Power1.easeInOut })
        .to(this.$refs.loader, 0, { opacity: '0', ease: Power1.easeInOut })
    }
  }
}
</script>

<style lang="scss">
html {
  min-height: 100vh;
  background-color: var(--background);
}

.oh {
  overflow: hidden;
}

.loader {
  display: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: var(--main);
}

.no-touchevents .cursor {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--main);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translateY(calc(50vh - 50%)) translateX(calc(50vw - 50%));
  pointer-events: none;
}

.tr-orange-entering {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 100vw;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background-color: var(--main);
  transform-origin: top;
}

.tr-orange-leaving {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background-color: var(--main);
}
</style>