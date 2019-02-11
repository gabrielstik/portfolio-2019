<template>
<div
  class="simple-image"
  ref="main"
  v-observe-visibility="{
    callback: visibilityChanged,
  }">
  <div class="oh">
    <img :src="`/images/${data.image.url}`" :alt="data.image.alt" ref="image">
  </div>
</div>
</template>

<script>
export default {
  name: 'SimpleImage',
  data() {
    return {
      isVisible: false,
      initialScroll: 0,
    }
  },
  props: ['data'],
  mounted: function() {
    if (this.data.parallax) {
      window.addEventListener('scroll', this.handleScroll)
      this.initParallax()
    }
  },
  destroyed () {
    if (this.data.parallax) window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    initParallax: function() {
      this.$refs.image.style.transform = 'scale(1.25)'
    },
    visible: function() {
      if (this.data.parallax) {
        this.isVisible = true
        this.initialScroll = window.scrollY
      }
    },
    handleScroll: function() {
      this.isVisible = window.scrollY >= this.$refs.main.offsetTop - this.$refs.main.offsetHeight ? true : false
      if (this.isVisible) TweenMax.to(this.$refs.image, .3, { y: `${(this.initialScroll - window.scrollY) / 8}px` })
    },
    visibilityChanged: function(isVisible, entry) {
      if (isVisible) {
        TweenMax.to(entry.target, 1, { opacity: 1, y: '0px', ease: Power1.easeOut })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-image {
  margin: 120px 0;
  padding: 0 17%;
  opacity: 0;
  transform: translateY(100px);
  will-change: opacity, translate;

  @media (max-width: 800px) {
    margin: 32px 0;
    padding: 0;
  }
}

.simple-image img {
  width: 100%;
}
</style>