<template>
<div id="projects" class="projects" ref="main">
  <ul class="projects-list" ref="list">
    <li v-for="(project, key) in data" class="project" :key="project.id" ref="project">
      <a :href="`/project/${project.slug}`" v-on:click="e => handleProjectClick(e, getPositionInArray(key), project.slug)" :title="project.cta">
        <div class="container">
          <h2 class="name" ref="name">{{project.name}}</h2>
          <div class="thumbnail">
            <img :src="`/images/${project.thumbnail.url}`" :alt="project.thumbnail.alt" ref="thumbnail">
            <div class="background" ref="background"></div>
          </div>
          <div class="infos">
            <div class="number-of" ref="numberOf">
              <div v-if="getPositionInArray(key).toString().length < 2" class="number">{{`0${getPositionInArray(key)}`}}</div>
              <div v-else class="number">{{getPositionInArray(key)}}</div>
              <div class="line"></div>
              <div v-if="projectLength.toString().length < 2" class="of">{{`0${projectLength}`}}</div>
              <div v-else class="of">{{projectLength}}</div>
            </div>
            <div class="see" ref="see">{{project.cta}}</div>
          </div>
        </div>
      </a>
    </li>
  </ul>
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
      rotationOffsets: [],
      verticalOffsets: [],
      rotateRatio: 40,
      currentScroll: 0,
      currentRotation: 0,
      currentVertical: 0,
      isScrollLocked: false
    }
  },
  created: function() {
    this.data = api.projects
    this.projectLength = Object.keys(this.data).length
  },
  mounted: function() {
    if (this.$store.state.fromRoute == null) this.mountAnimation(1.5)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)

    this.initProjectRotate()

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
        .from(this.$refs.name[0], .5, { y: '120px', opacity: 0, ease: Power1.easeOut }, delay + .4)
        .from(this.$refs.numberOf[0], .5, { y: '60px', opacity: 0, ease: Power1.easeOut }, delay + .45)
        .from(this.$refs.see[0], .5, { y: '60px', opacity: 0, ease: Power1.easeOut }, delay + .5)
        .from(this.$refs.background[0], 1, { opacity: 0, scale: .8, ease: Power1.easeOut }, delay + .4)
    },
    initProjectRotate() {
      for (let i = 0; i < this.$refs.project.length; i++) {
        this.rotationOffsets[i] = window.innerWidth / this.rotateRatio * i
        this.$refs.project[i].style.transform = `rotate(${this.rotationOffsets[i]}deg)`
      }
    },
    handleScroll(e) {
      if (e.speedX == 0 && e.speedY == 0) e.preventDefault()
      else {
        if (!this.isScrollLocked) {
          this.currentScroll -= e.deltaY
          if (this.currentScroll >= 0) this.currentScroll = 0
          if (this.currentScroll <= -this.$refs.list.offsetWidth) this.currentScroll = -this.$refs.list.offsetWidth

          this.$refs.list.style.transform = `translateX(${this.currentScroll}px)`

          for (let i = 0; i < this.$refs.project.length; i++) {
            this.currentRotation = -this.currentScroll / window.innerWidth * this.rotationOffsets[1]
            this.$refs.project[i].style.transform = `rotate(${this.rotationOffsets[i] - this.currentRotation}deg)`
          }
        }
      }
    },
    getPositionInArray(index) {
      const keys = Object.keys(this.data)
      let i = 0
      for (const key of keys) { i++
        if (key == index) return i
      }
    },
    handleProjectClick(e, i, slug) {
      e.preventDefault()
      i--

      this.isScrollLocked = true

      const rect = this.$refs.background[i].getBoundingClientRect()
      console.log(rect)
      this.$refs.background[i].style.position = 'fixed'
      this.$refs.background[i].style.top = 'auto'
      this.$refs.background[i].style.bottom = `${window.innerHeight - (rect.top + rect.height)}px`
      this.$refs.background[i].style.left = `${rect.left}px`
      this.$refs.background[i].style.width = `${rect.width}px`
      this.$refs.background[i].style.height = `${rect.height}px`

      const timeline = new TimelineMax({ onComplete: () => this.$router.push({ path: `/project/${slug}`}) })
      timeline
        .to(this.$refs.name[i], .5, { y: '120px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.thumbnail[i], .5, { y: '80px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.numberOf[i], .5, { y: '60px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.see[i], .5, { y: '60px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.see[i], .5, { y: '60px', opacity: 0, ease: Power1.easeIn }, 0)
        .to(this.$refs.background[i], 1, { bottom: '0px', ease: Power1.easeInOut }, 0)
        .to(this.$refs.background[i], .8, { left: '0px', right: '0px', width: '100%', height: '180px',  ease: Power1.easeInOut }, .7)
    }
  }
}
</script>

<style lang="scss" scoped>
#projects {
  height: 100vh;
  width: 100%;
  /* overflow: hidden; */
}

.projects-list {
  display: flex;
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

.name {
  width: 100%;
  font-family: 'PTSerif', serif;
  font-size: 120px;
  text-align: right;
  color: var(--main);
  position: absolute;
  top: -80px;
  right: 0;
  z-index: 1;
  transform: translateZ(0px);
}

.thumbnail {
  width: 50vw;
  height: 425px;
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