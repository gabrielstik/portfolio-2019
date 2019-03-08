<template>
<div id="project" class="project" ref="main">
  <header class="project__header">
    <div class="header__title-container container">
      <div class="header__date-type">
        <div class="header__date" ref="date">{{data.infos.date}}</div>
        <div class="header__type" ref="type">{{data.infos.type}}</div>
      </div>
      <div class="oh"><h1 class="header__title" ref="name">{{data.name}}</h1></div>
      <div class="header__link" ref="cta"><a :href="data.link.url" :title="data.name" target="_blank">
        <span>{{data.link.label}}</span></a>
      </div>
    </div>
    <div class="header__infos">
      <div v-if="data.infos.client" class="header__infos__info">
        <div class="header__infos__label" ref="label1">Client</div>
        <div class="header__infos__data" ref="data1">{{data.infos.client}}</div>
      </div>
      <div v-if="data.infos.role" class="header__infos__info">
        <div class="header__infos__label" ref="label2">Role</div>
        <div class="header__infos__data" ref="data2">{{data.infos.role}}</div>
      </div>
      <div v-if="data.infos.date" class="header__infos__info">
        <div class="header__infos__label" ref="label3">Year</div>
        <div class="header__infos__data" ref="data3">{{data.infos.date}}</div>
      </div>
      <div v-if="data.infos.techs" class="header__infos__info">
        <div class="header__infos__label" ref="label4">Tech</div>
        <div class="header__infos__data" ref="data4">{{data.infos.techs}}</div>
      </div>
    </div>
  </header>
  <div class="project__content" v-for="layout in data.content" :key="layout.id">
    <FullWidthText
      v-if="layout.type == 'full-width-text'"
      :data="layout"
    />
    <SimpleImage
      v-if="layout.type == 'simple-image'"
      :data="layout"
    />
    <FullWidthImage
      v-if="layout.type == 'full-width-image'"
      :data="layout"
    />
    <FullWidthTitle
      v-if="layout.type == 'full-width-title'"
      :data="layout"
    />
  </div>
</div>
</template>

<script>
import api from '~/api/data.json'
import { TweenMax } from 'gsap'

import FullWidthText from '~/components/project/FullWidthText'
import FullWidthImage from '~/components/project/FullWidthImage'
import FullWidthTitle from '~/components/project/FullWidthTitle'
import SimpleImage from '~/components/project/SimpleImage'

export default {
  name: 'Projects',
  head: {
    title: `Gabriel Stik — Portfolio`
  },
  components: {
    FullWidthText,
    FullWidthImage,
    FullWidthTitle,
    SimpleImage
  },
  data() {
    return {
      data: {},
    }
  },
  created: function() {
    const pathArray = this.$route.path.split('/')
    const projectName = pathArray[pathArray.length-1]
    this.data = api.projects[projectName]
  },
  mounted: function() {
    if (this.$store.state.fromRoute == null) this.mountAnimation(1.5)
    else this.mountAnimation(0)
    this.$store.commit('updateRoute', this.$route.path)
  },
  beforeRouteLeave: function(to, from, next) {
    if (to.name == 'about') {
      const $orange = document.createElement('div')
      $orange.classList.add('tr-orange-entering')
      this.$refs.main.appendChild($orange)
      TweenMax.to($orange, 1, { y: '-100vw', ease: Power1.easeInOut, onComplete: next });
    }
    else TweenMax.to(this.$refs.container, .2, { opacity: 0, onComplete: next })
  },
  methods: {
    mountAnimation(delay) {
      const labels = [this.$refs.label1, this.$refs.label2, this.$refs.label3, this.$refs.label4]
      const datas = [this.$refs.data1, this.$refs.data2, this.$refs.data3, this.$refs.data4]

      const timeline = new TimelineMax()
      timeline
        .from(this.$refs.name, 1, { y: '100%', ease: Power1.easeOut }, delay + 0)
        .from(this.$refs.date, .4, { y: '30px', opacity: 0, ease: Power1.easeOut }, delay + .2)
        .from(this.$refs.type, .4, { y: '30px', opacity: 0, ease: Power1.easeOut }, delay + .3)
        .staggerFrom(labels, .4, { y: '30px', opacity: 0, ease: Power1.easeOut }, .1, delay + .5)
        .staggerFrom(datas, .4, { y: '30px', opacity: 0, ease: Power1.easeOut }, .1, delay + .55)
        .from(this.$refs.cta, .4, { y: '30px', opacity: 0, ease: Power1.easeOut }, delay + 1.2)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 240px;
  position: relative;
}

.project {

  &__header {
    height: 100vh;
    min-height: 600px;
    display: flex;
    flex-direction: column;
  }

  .header {

    &__title-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__infos {
      height: 180px;
      padding: 0 140px;
      background-color: var(--main);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__info {
        display: block;
        margin: 0 15px;
      }

      &__label {
        font-family: 'Graphik', sans-serif;
        font-size: 14px;
        color: var(--bodyWhite);
        letter-spacing: 0.78px;
        line-height: 18px;
        text-transform: uppercase;
      }

      &__data {
        margin-top: 6px;
        font-family: 'Graphik', sans-serif;
        font-size: 18px;
        color: var(--bodyWhite);
        letter-spacing: 0;
        line-height: 24px;
      }
    }

    &__date-type {
      font-family: 'Graphik', sans-serif;
      font-size: 16px;
      color: var(--bodyGrey);
      letter-spacing: 0.89px;
    }

    &__type {
      margin-top: 7px;
    }

    &__title {
      font-family: 'PTSerif', serif;
      font-size: 240px;
      color: var(--main);
      letter-spacing: 0;
      text-align: center;
      text-align: right;
    }

    &__link {
      font-family: 'Graphik', sans-serif;
      font-size: 16px;
      color: var(--main);
      letter-spacing: 0.89px;
      line-height: 46px;
      text-align: right;
      margin-right: 40px;

      span {
        display: inline-block;
        position: relative;

        &::after {
          content: url(~assets/icons/arrows/arrow.svg);
          width: 24px;
          height: 8px;
          position: absolute;
          top: 1px;
          right: -36px;
          z-index: 100;
        }
      }
    }
  }
}
</style>