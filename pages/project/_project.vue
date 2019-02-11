<template>
<div id="project" class="project" ref="main">
  <header class="project__header">
    <div class="header__title-container container">
      <div class="header__date-type">
        <div class="header__date">{{data.infos.date}}</div>
        <div class="header__type">{{data.infos.type}}</div>
      </div>
      <h1 class="header__title">{{data.name}}</h1>
      <div class="header__link"><a :href="data.link.url" :title="data.name" target="_blank">
        <span>{{data.link.label}}</span></a>
      </div>
    </div>
    <div class="header__infos">
      <div v-if="data.infos.client" class="header__infos__info">
        <div class="header__infos__label">Client</div>
        <div class="header__infos__data">{{data.infos.client}}</div>
      </div>
      <div v-if="data.infos.role" class="header__infos__info">
        <div class="header__infos__label">Role</div>
        <div class="header__infos__data">{{data.infos.role}}</div>
      </div>
      <div v-if="data.infos.date" class="header__infos__info">
        <div class="header__infos__label">Year</div>
        <div class="header__infos__data">{{data.infos.date}}</div>
      </div>
      <div v-if="data.infos.techs" class="header__infos__info">
        <div class="header__infos__label">Tech</div>
        <div class="header__infos__data">{{data.infos.techs}}</div>
      </div>
    </div>
  </header>
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
    next()
  },
  methods: {
    mountAnimation(delay) {
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
    margin-bottom: 140px;
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
      padding: 0 240px;
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
      margin-right: 16px;

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