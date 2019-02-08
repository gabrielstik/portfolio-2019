<template>
  <div class="globalContainer">
    <Header/>
    <main class="main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import Header from '~/components/Header';

export default {
  components: {
    Header
  },
}
</script>

<style lang="scss">
html {
  min-height: 100vh;
  background-color: var(--background);
}
</style>