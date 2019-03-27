<template>
<div
  class="full-width-title"
  v-observe-visibility="{
    callback: visibilityChanged,
    throttle: 100
  }">
  <h2>{{data.title}}</h2>
</div>
</template>

<script>
export default {
  name: 'FullWidthTitle',
  props: ['data'],
  methods: {
    visibilityChanged: function(isVisible, entry) {
      if (isVisible) {
        TweenMax.to(entry.target, 1, { opacity: 1, y: '0px', ease: Power1.easeOut })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.full-width-title {
  margin: 190px 0;
  padding: 0 25%;
  opacity: 0;
  transform: translateY(100px);
  will-change: opacity, translate;

  @media (max-width: 800px) {
    margin: 80px 0;
    padding: 0 5vw;
  }
}

.full-width-text img {
  width: 100%;
}

h2 {
  font-family: 'PTSerif', serif;
  font-size: 60px;
  line-height: 80px;
  color: var(--main);
  letter-spacing: 0;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 30px;
    line-height: 45px;
  }
}

.dark-project p { color: var(--lighterGrey) }
</style>