<template>
<div id="header" class="header" ref="header">
  <nav>
    <ul>
      <li v-for="link in data.nav" :key="link.id">
        <a v-if="link.link.match(/(\/\/|mailto:).*/g)" :href="link.link" :title="link.label" class="link">{{link.label}}</a>
        <nuxt-link v-else :to="link.link" class="link">{{link.label}}</nuxt-link>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
import api from '~/api/data.json'

export default {
  name: 'Header',
  props: [],
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.data = api.header
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#header {
  position: fixed;
  right: 120px;
  left: 120px;
  z-index: 99999;
  height: 100px;

  @media (max-width: 800px) {
    right: 5vw;
    left: 5vw;
  }
}

nav ul {
  margin: 30px auto;
  display: flex;
  justify-content: space-between;

  .link {
    font-family: 'Maison Neue', sans-serif;
    font-size: 18px;
    color: var(--main);
    letter-spacing: 1px;
    text-align: center;
    line-height: 33px;
  }
}
</style>