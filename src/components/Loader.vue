<template>
  <div :class="$style.loader" :style="mainStyle">
    <div :class="$style.before" :style="beforeStyle"></div>
    <div :class="$style.after" :style="afterStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    color: String,
    bgColor: String,
  },
  computed: {
    mainStyle() {
      const background = this.color
        ? `linear-gradient(to right, ${this.color} 10%, rgb(255, 255, 255, 0) 42%)`
        : undefined;

      return {
        background,
      };
    },
    beforeStyle() {
      return {
        background: this.color,
      };
    },
    afterStyle() {
      return {
        background: this.bgColor,
      };
    },
  },
};
</script>

<style module>
.loader {
  font-size: 10px;
  text-indent: -9999em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    var(--black) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: loader 1.4s infinite linear;
  transform: translateZ(0);
}
.before {
  width: 50%;
  height: 50%;
  background: var(--black);
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.after {
  background: var(--white);
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
