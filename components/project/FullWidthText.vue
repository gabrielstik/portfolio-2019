<template>
<div
  class="full-width-text"
  v-observe-visibility="{
    callback: visibilityChanged,
    throttle: 100
  }">
  <p>{{data.text}}</p>
</div>
</template>

<script>
export default {
  name: 'FullWidthText',
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
.full-width-text {
  margin: 140px 0;
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

p {
  font-family: 'Graphik', sans-serif;
  font-size: 22px;
  color: var(--bodyGrey);
  letter-spacing: 0;
  line-height: 35px;

  @media (max-width: 800px) {
    font-size: 18px;
  }
}

.dark-project p { color: var(--lighterGrey) }
</style>