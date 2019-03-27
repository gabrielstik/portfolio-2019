<template>
<div
  class="video"
  ref="main"
  v-observe-visibility="{
    callback: visibilityChanged,
  }">
  <video :src="`/images/${data.video.url}`" :alt="data.video.alt" ref="video"></video>  
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
    this.$refs.video.setAttribute('playsinline', true)
    this.$refs.video.setAttribute('loop', true)
    this.$refs.video.setAttribute('muted', true)
    this.$refs.video.setAttribute('autplay', true)
  },
  methods: {
    visibilityChanged: function(isVisible, entry) {
      if (isVisible) {
        TweenMax.to(entry.target, 1, { opacity: 1, y: '0px', ease: Power1.easeOut })
        this.$refs.video.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
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

.video video {
  width: 100%;
}
</style>