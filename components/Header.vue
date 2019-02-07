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
  mounted() {
    console.log(this.data)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#header {
  position: fixed;
  width: 100vh;
  height: 100px;
  border-bottom: solid 1px var(--lightGrey);
  transform-origin: top left;
  transform: translateY(100vh) rotate(-90deg);
}

nav {
  display: flex;
  align-items: center;
}

nav ul {
  width: 60vh;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;

  .link {
    transform: rotate(-90deg);
    font-family: 'Graphik', sans-serif;
    font-size: 16px;
    color: var(--main);
    letter-spacing: 0;
    text-align: center;
    line-height: 33px;
  }
}
</style>