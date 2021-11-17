<template>
  <button :class="mainClass" :style="mainStyle" v-on="$listeners">
    <Loader
      v-if="loading"
      :class="$style.loader"
      :bgColor="color"
      :color="textColor"
    />

    <span :class="$style.content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Loader from './Loader.vue';
import defaultTypes from '../constants/defaultTypes';
import colors from '../constants/colors';

export default {
  name: 'MyButton',
  components: {
    Loader,
  },
  props: {
    loading: defaultTypes.boolean(),
    error: defaultTypes.boolean(),
    color: defaultTypes.string(undefined),
    textColor: defaultTypes.string(undefined),
    onlyText: defaultTypes.boolean(),
  },
  data() {
    return {
      colors,
    };
  },
  computed: {
    mainClass() {
      return [
        this.$style['my-button'],
        {
          [this.$style.loading]: this.loading,
          [this.$style.error]: this.error,
          [this.$style.text]: this.onlyText,
        },
      ];
    },
    mainStyle() {
      return {
        backgroundColor: this.color,
        color: this.textColor,
      };
    },
  },
};
</script>

<style module>
.my-button {
  height: 32px;
  background-color: var(--primary);
  border: none;
  border-radius: 6px;
  color: var(--white);
  font-size: 14px;
  line-height: 1.29;
  font-weight: 700;
  padding: 0 12px;
  cursor: pointer;
  position: relative;
}
.my-button.text {
  background-color: transparent;
  color: inherit;
}
.my-button.error {
  background-color: var(--error);
}
.loader {
  display: none;
  position: absolute;
  left: 50%;
  margin-left: -5px;
}
.my-button.loading {
  pointer-events: none;
}
.my-button.loading .content {
  visibility: hidden;
}
.my-button.loading .loader {
  display: block;
}
</style>
