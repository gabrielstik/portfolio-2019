<template>
<div
  class="titleText"
  v-observe-visibility="{
    callback: visibilityChanged,
    throttle: 300
  }"
  >
  <h2 ref="title">{{data.title}}</h2>
  <p ref="text">{{data.text}}</p>
</div>
</template>

<script>
export default {
  name: 'TitleText',
  props: ['data'],
  methods: {
    visibilityChanged: function(isVisible, entry) {
      if (isVisible) {
        TweenMax.to(this.$refs.title, 1, { opacity: 1, y: '0px', ease: Power1.easeOut })
        TweenMax.to(this.$refs.text, 1, { opacity: 1, y: '0px', delay: .2, ease: Power1.easeOut })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.titleText {
  margin: 120px 0;
  padding: 0 17%;
  display: flex;
  
  @media (max-width: 800px) {
    margin: 32px 0;
    padding: 0 24px;
    display: block;
  }
}

h2 {
  width: 45vw;
  margin-right: 10vw;
  font-family: 'Prata', serif;
  font-size: 50px;
  color: var(--main);
  letter-spacing: -0.83px;
  line-height: 60px;
  transform: translateY(100px);
  opacity: 0;
  will-change: transform, opacity;

  @media (max-width: 800px) {
    width: 80%;
    font-size: 32px;
    line-height: 38px;
    margin-right: 0;
  }
}

.dark-project h2 { color: var(--white) }

p {
  opacity: 0.6;
  font-family: 'Graphik', sans-serif;
  font-size: 16px;
  color: var(--darkGrey);
  letter-spacing: -0.27px;
  line-height: 28px;
  transform: translateY(100px);
  opacity: 0;
  will-change: transform, opacity;

  @media (max-width: 800px) {
    margin-top: 40px;
  }

  @media (min-width: 1560px) {
    font-size: 20px;
    line-height: 36px;
  }
}

.dark-project p { color: var(--lighterGrey) }
</style>