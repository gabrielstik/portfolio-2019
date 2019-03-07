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
  z-index: 99999;
  height: 100px;
  padding: 0 120px;
}

nav ul {
  margin: 20px auto;
  display: flex;

  .link {
    margin-right: 50px;
    font-family: 'Graphik', sans-serif;
    font-size: 16px;
    color: var(--main);
    letter-spacing: 0;
    text-align: center;
    line-height: 33px;
    opacity: .5;
  }
}
</style>