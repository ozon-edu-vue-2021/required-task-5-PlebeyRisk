<template>
  <span :class="$style.icon">
    <component
      v-if="name && name.length"
      :fill="color || 'black'"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      :is="require(`../assets/icons/${name}.svg`)"
    />
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    size: {
      type: Number,
      default: 24,
    },
    color: String,
  },
};
</script>

<style module>
.icon {
  display: flex;
  align-items: center;
}
</style>
