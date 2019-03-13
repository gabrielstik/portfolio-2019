<template>
<div id="about" class="about" ref="main">
  <section v-for="chapter of data.chapters" :key="chapter.id" class="chapter" ref="chapter">
    <h2 class="chapter__title" ref="title">{{chapter.title}}</h2>
    <p v-if="chapter.text" class="chapter__text" v-html="chapter.text"></p>
    <ul v-if="chapter.experiences" class="experiences">
      <li class="experience" v-for="experience of chapter.experiences" :key="experience.id">
        <div>
          <h3 class="experience__name">{{experience.name}}</h3>
          <div class="experience__role-date">
            <span class="experience__role">{{experience.role}}</span>
            <span class="experience__date">{{experience.place}}</span>
          </div>
        </div>
        <p class="experience__place">{{experience.date}}</p>
      </li>
    </ul>
    <ul v-if="chapter.skills" class="skills">
      <li class="skill" v-for="skill of chapter.skills" :key="skill.id">
        <h3 class="skill__title">{{skill.type}}</h3>
        <ul class="skill__skills">
          <li class="skill__skill" v-for="skill of skill.skills" :key="skill.id">{{skill}}</li>
        </ul>
      </li>
    </ul>
  </section>
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
    this.data = api.about
  },
  mounted: function() {
    if (this.$store.state.fromRoute == null) this.mountAnimation(.7)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)

    this.setChapterHeight()
  },
  beforeRouteLeave: function(to, from, next) {
    TweenMax.to(this.$refs.main, .7, { y: '-600px', opacity: 0, ease: Power1.easeIn, onComplete: next })
  },
  methods: {
    mountAnimation: function(delay) {
      TweenMax.from(this.$refs.main, 1, { y: '100vh', ease: Power1.easeOut })
      TweenMax.staggerFrom(this.$refs.title, .7, { y: '100vh', ease: Power1.easeOut, delay: .3 })
    },
    setChapterHeight: function() {
      for (let i = 0; i < this.$refs.chapter.length; i++) {
        this.$refs.chapter[i].style.minHeight = `${this.$refs.title[i].offsetWidth}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#about {
  padding: 150px 16vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: var(--background);
}

.chapter {
  margin-bottom: 190px;
  margin-left: 110px;

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    display: inline-block;
    font-family: 'PTSerif', serif;
    font-size: 120px;
    color: var(--main);
    letter-spacing: 0;
    transform-origin: left bottom;
    transform: rotate(-90deg) translateX(-100%);
  }

  &__text {
    margin-left: 100px;
    width: 60%;
    font-family: 'Graphik', sans-serif;
    font-size: 18px;
    color: var(--bodyGrey);
    letter-spacing: 0;
    line-height: 32px;

    strong {
      font-weight: bold;
      color: var(--main);
    }
  }

  .experiences {
    margin-left: 100px;
    width: 60%;
    font-family: 'Graphik', sans-serif;
    font-size: 18px;
    color: var(--bodyGrey);
    letter-spacing: 0;
    line-height: 32px;

    .experience {
      margin-bottom: 20px;
      padding: 20px 0;
      border-bottom: solid 1px var(--main);
      display: flex;
      justify-content: space-between;

      &__name {
        font-weight: bold;
      }

      &__role-date {
        margin-top: 10px;
      }
    }
  }

  .skills {
    display: flex;
    margin-left: 100px;
    width: 60%;
    font-family: 'Graphik', sans-serif;
    font-size: 18px;
    color: var(--bodyGrey);
    letter-spacing: 0;
    line-height: 32px;

    .skill {
      margin-right: 80px;

      &__title {
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>