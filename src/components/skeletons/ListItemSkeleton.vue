<template>
  <div :class="$style['list-item-skeleton']">
    <div :class="contentClass"></div>
  </div>
</template>

<script>
export default {
  name: 'GridListSkeleton',
  computed: {
    contentClass() {
      return [this.$style.content, this.$style.blink];
    },
  },
};
</script>

<style module>
.list-item-skeleton {
  width: 200px;
  height: 100px;
}
.blink {
  animation-name: blink;
  animation-timing-function: linear;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}
.content {
  height: 100%;
}
@keyframes blink {
  0% {
    background-color: #cccccc;
  }
  50% {
    background-color: #dfdfdf;
  }
  100% {
    background-color: #cccccc;
  }
}
</style>
