<template>
  <div class="globalContainer">
    <Header/>
    <main class="main">
      <nuxt/>
      <div class="cursor" ref="cursor"></div>
      <div class="loader" ref="loader">
        <div class="background" ref="background"></div>
        <div class="name-job" ref="text">
          <div class="name">Gabriel Stik</div>
          <div class="job">Digital developer</div>
        </div>
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
    this.animateLoader()
  },
  methods: {
    initCursor: function() {
      const $cursor = this.$refs.cursor
      window.addEventListener('mousemove', (e) => {
        TweenMax.to($cursor, .3, { x: `${e.clientX - 4}px`, y: `${e.clientY - 4}px`, ease: Power1.easeOut })
      })
    },
    animateLoader() {
      if (this.$route.name == 'project-project') {
        const timeline = new TimelineMax({ onComplete: () => this.$refs.loader.style.display = `none` })
        timeline
          .to(this.$refs.text, .9, { y: '15vh', ease: Power1.easeInOut }, .6)
          .to(this.$refs.loader, .5, { y: `${window.innerHeight - 180}px`, ease: Power1.easeInOut }, .6)
      }
      else {
        const timeline = new TimelineMax({ onComplete: () => this.$refs.loader.style.display = `none` })
        timeline
          .to(this.$refs.text, .9, { y: '15vh', ease: Power1.easeInOut }, .6)
          .to(this.$refs.loader, .5, { y: '-100vh', ease: Power1.easeInOut }, .6)
      }
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
  /* display: none; */
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: var(--main);
  display: flex;
  align-items: center;

  .name {
    margin-left: 10vw;
    font-family: 'PTSerif', serif;
    font-size: 180px;
    color: var(--background);
  }

  .job {
    margin-left: 10vw;
    margin-top: 30px;
    font-family: 'Graphik', sans-serif;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: normal;
    color: var(--background);
  }
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
  top: 100vh;
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