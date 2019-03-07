<template>
<div id="projects" class="projects" ref="main">
  <div class="project" ref="project">
    <div class="container">
      <div class="names" ref="names">
        <h2 v-for="(project, index) of data" :key="project.id" class="name" ref="name">
          <a :href="`/project/${project.slug}`" v-on:click="e => handleProjectClick(e, getPositionInArray(index), project.slug)">{{project.name}}</a>
        </h2>
      </div>
      <div class="thumbnails" ref="thumbnailsContainer">
        <div v-for="(project, index) of data" :key="project.id" class="thumbnail" ref="thumbnails">
          <a :href="`/project/${project.slug}`" v-on:click="e => handleProjectClick(e, getPositionInArray(index), project.slug)">
            <img :src="`/images/${project.thumbnail.url}`" :alt="project.thumbnail.alt" ref="thumbnail">
            <div class="background" ref="background"></div>
          </a>
        </div>
      </div>
      <div class="infos">
        <div class="number-of" ref="numberOf">
          <div class="number">{{`0${currentID+1}`}}</div>
          <div class="line"></div>
          <div class="of">{{`0${projectLength}`}}</div>
        </div>
        <div class="see" ref="see">{{current.cta}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '~/api/data.json'
import { TweenMax } from 'gsap'

export default {
  name: 'Projects',
  head: {
    title: `Gabriel Stik — Portfolio`
  },
  data() {
    return {
      data: {},
      current: {},
      currentID: 0,
      scroll: 0,
      isScrolling: false,
      ratio: 1.4
    }
  },
  created: function() {
    this.data = api.projects
    this.keys = Object.keys(api.projects)
    this.currentID = 0
    this.projectLength = Object.keys(this.data).length
    this.current = api.projects[this.keys[this.currentID]]
  },
  mounted: function() {
    this.ratio = window.innerHeight / window.innerWidth
    if (this.$store.state.fromRoute == null) this.mountAnimation(1.5)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)

    this.initThumbnailsOffset()

    document.body.style.overflow = 'hidden'
    window.addEventListener('mousewheel', this.handleScroll)
  },
  beforeRouteLeave: function(to, from, next) {
    next()
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto'
    window.removeEventListener('mousewheel', this.handleScroll)
  },
  methods: {
    mountAnimation(delay) {
      const timeline = new TimelineMax()
      timeline
        .from(this.$refs.thumbnail[0], .5, { y: '80px', opacity: 0, ease: Power1.easeOut }, delay + 0)
        .from(this.$refs.name[0], .5, { y: '120px', opacity: 0, ease: Power1.easeOut }, delay + .05)
        // .from(this.$refs.numberOf, .5, { y: '60px', opacity: 0, ease: Power1.easeOut }, delay + .45)
        // .from(this.$refs.see, .5, { y: '60px', opacity: 0, ease: Power1.easeOut }, delay + .5)
        .from(this.$refs.background[0], 1, { opacity: 0, scale: .8, ease: Power1.easeOut }, delay + .2)
    },
    initThumbnailsOffset() {
      this.$refs.thumbnailsContainer.style.transform = 'translateX(0px)'
      const l = this.$refs.name.length
      for (let i = 0; i < l; i++) {
        console.log(`translateX(${-i*100}px)`)
        this.$refs.name[i].style.transform = `translateX(${i*40}vw)`
      }
    },
    handleScroll(e) {
      if (e.deltaX == 0 && e.deltaY == 0) e.preventDefault()
      
      const skew = (max) => {
        if (e.deltaY > max) return -max
        else if (e.deltaY < -max) return max
        else return -e.deltaY
      }

      this.scroll -= e.deltaY
      TweenMax.to(this.$refs.names, .05, { x: `${this.scroll*1.4}px`, skewX: `${skew(20)}deg` })
      this.$refs.thumbnailsContainer.style.transform = `translateX(${this.scroll}px)`
      if (this.scroll >= 0) this.scroll = 0
      if (this.scroll <= -this.$refs.names.offsetWidth) this.scroll = -this.$refs.names.offsetWidth
    },
    updateProject() {
      this.isScrolling = true
      setTimeout(() => this.isScrolling = false, 2000)
    },
    handleProjectClick(e, i, slug) {
      e.preventDefault()

      const rect = this.$refs.background[i].getBoundingClientRect()
      console.log(rect.bottom)
      this.$refs.background[i].style.transform = 'none'
      this.$refs.background[i].style.position = 'fixed'
      this.$refs.background[i].style.top = 'auto'
      this.$refs.background[i].style.bottom = `${window.innerHeight - (rect.top + rect.height) - (rect.bottom - rect.height) + 30}px`
      this.$refs.background[i].style.left = `${30 + i * window.innerWidth}px`
      this.$refs.background[i].style.width = `${rect.width}px`
      this.$refs.background[i].style.height = `${rect.height}px`

      const timeline = new TimelineMax({ onComplete: () => this.$router.push({ path: `/project/${slug}`}) })
      timeline
        .to(this.$refs.name[i], .5, { y: '120px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.thumbnail[i], .5, { y: '80px', opacity: 0, ease: Power1.easeIn }, 0)
        // .to(this.$refs.numberOf[i], .5, { y: '60px', opacity: 0, ease: Power1.easeIn }, 0)
        // .to(this.$refs.see[i], .5, { y: '60px', opacity: 0, ease: Power1.easeIn }, 0)
        // .to(this.$refs.see[i], .5, { y: '60px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.background[i], 1, { bottom: `-${rect.bottom - rect.height - 30}px`, ease: Power1.easeInOut }, 0)
        .to(this.$refs.background[i], .8, { left: `${-rect.left + 30 + i * window.innerWidth}px`, width: '100vw', height: '180px',  ease: Power1.easeInOut }, .7)
    },
    getPositionInArray(index) {
      const keys = Object.keys(this.data)
      let i = 0
      for (const key of keys) { i++
        if (key == index) return i-1
      }
    },
  }
}
</script>

<style lang="scss" scoped>
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#projects {
  height: 100vh;
  width: 100%;
  /* overflow: hidden; */
}

.project {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  perspective: 800px;
  transform-style: preserve-3d;
}

.container {
  margin: 0 240px;
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-column-gap: 100px;
  position: relative;
}

.names {
  position: absolute;
  top: -80px;
  right: 0;
  z-index: 1;
  width: 100vw;
  display: flex;
}

.name {
  width: 100%;
  font-family: 'PTSerif', serif;
  font-size: 120px;
  text-align: right;
  color: var(--main);
  flex-shrink: 0;
}

.thumbnails {
  height: 425px;
  /* position: relative; */
  display: flex;
}

.thumbnail {
  width: 50vw;
  height: 425px;
  margin-right: 50vw;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.background {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: var(--main);
}

.infos {
  background-color: red;
  height: calc(425px - 64px);
  margin-left: auto;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.number-of {
  display: flex;
  justify-content: space-between;
  font-family: 'Graphik', sans-serif;
  font-size: 18px;
  color: var(--grey);
  letter-spacing: 0;
  line-height: 26px;

  .number {
    color: var(--main);
  }

  .line {
    width: 100%;
    margin: 12px 12px;
    height: 1px;
    background-color: var(--grey);
  }
}

.see {
  font-family: 'Graphik', sans-serif;
  font-size: 16px;
  color: var(--main);
  letter-spacing: 0;
  line-height: 26px;
  text-align: right;
  padding-bottom: 2px;
  border-bottom: solid 1px var(--main);
}
</style>