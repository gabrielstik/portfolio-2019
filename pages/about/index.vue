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
    <ul v-if="chapter.socials" class="reach">
      <li class="social" v-for="social of chapter.socials" :key="social.id"><a :href="social.link" :title="`Reach me on ${social.name}`" target="_blank">{{social.name}} <div class="reach__link__image"></div></a></li>
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
    if (this.$store.state.fromRoute == null) this.mountAnimation(.6)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)

    this.setChapterHeight()
  },
  beforeRouteLeave: function(to, from, next) {
    TweenMax.to(this.$refs.main, .7, { y: '-600px', opacity: 0, ease: Power1.easeIn, onComplete: next })
  },
  methods: {
    mountAnimation: function(delay) {
      if (this.$store.state.fromRoute == null || this.$store.state.fromRoute == '/') {
        TweenMax.staggerFrom(this.$refs.chapter, 1, { y: '100vh', ease: Power1.easeOut, delay: delay })
        TweenMax.staggerFrom(this.$refs.title, .7, { y: '100vh', ease: Power1.easeOut, delay: delay + .3 })
      }
      else {
        delay = .5
        const $orange = document.createElement('div')
        $orange.classList.add('tr-orange-leaving')
        this.$refs.main.appendChild($orange)
        const timeline = new TimelineMax()
        timeline
          .to($orange, .5, { y: '-100vh', ease: Power1.easeInOut }, 0)
          .to($orange, 0, { opacity: '0' }, .5)
          .staggerFrom(this.$refs.chapter, 1, { y: '100vh', ease: Power1.easeOut }, .1, delay)
          .staggerFrom(this.$refs.title, .7, { y: '100vh', ease: Power1.easeOut }, .1, delay + .3)
      }
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

  @media (max-width: 800px) {
    padding: 80px 5vw;
  } 
}

.chapter {
  margin-bottom: 190px;
  margin-left: 110px;

  @media (max-width: 800px) {
    margin-left: 40px;
    margin-bottom: 100px;
  } 

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    display: inline-block;
    font-family: 'Prata', serif;
    font-size: 120px;
    color: var(--main);
    letter-spacing: 0;
    transform-origin: left bottom;
    transform: rotate(-90deg) translateX(-100%);

    @media (max-width: 800px) {
      font-size: 36px;
    }
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

    @media (max-width: 800px) {
      width: calc(100% - 5vw);
      margin-left: 5vw;
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

    @media (max-width: 800px) {
      width: calc(100% - 5vw);
      margin-left: 5vw;
    }

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

      @media (max-width: 800px) {
        margin-top: -20px;
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

    @media (max-width: 800px) {
      width: calc(100% - 5vw);
      margin-left: 5vw;
      display: block;
    }

    .skill {
      margin-right: 80px;

      &__title {
        margin-bottom: 10px;
        font-weight: bold;
      }

      @media (max-width: 800px) {
        margin-bottom: 30px;
      }
    }
  }

  .reach {
    margin-bottom: 200px;
    
    a {
      display: block;
      margin-top: 20px;
      margin-left: 100px;
      width: 60%;
      font-family: 'Graphik', sans-serif;
      font-size: 24px;
      color: var(--bodyGrey);
      letter-spacing: 0;
      line-height: 32px;
      transition: color .2s ease-in-out;

      .reach__link__image {
        margin-left: 7px;
        display: inline-block;
        background-image: url(~assets/icons/arrows/arrow-link.svg);
        background-size: contain;
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
        transition: transform .1s ease-in-out;
      }

      &:hover {
        color: var(--main);

        .reach__link__image {
          transform: translateX(10px);
        }
      }

      strong {
        font-weight: bold;
        color: var(--main);
      }

      @media (max-width: 800px) {
        width: calc(100% - 5vw);
        margin-left: 5vw;
      }
    }
  }
}
</style>