<template>
  <div :class="mainClass">
    <MyButton
      :class="[$style.button, $style['btn-decrease']]"
      @click="decreaseNumber"
    >
      <Icon name="remove" v-bind="btnOptions" />
    </MyButton>

    <span :class="$style.number">{{ inputValue }} шт.</span>

    <MyButton
      :class="[$style.button, $style['btn-increase']]"
      @click="increaseNumber"
    >
      <Icon name="add" v-bind="btnOptions" />
    </MyButton>
  </div>
</template>

<script>
import defaultTypes from '../constants/defaultTypes';
import colors from '../constants/colors';
import MyButton from './MyButton';
import Icon from './Icon';

export default {
  name: 'CounterInput',
  components: {
    MyButton,
    Icon,
  },
  props: {
    max: defaultTypes.number(),
    min: defaultTypes.number(),
    value: defaultTypes.number(0),
    step: defaultTypes.number(1),
  },
  data() {
    return {
      inputValue: 0,
      btnOptions: {
        color: colors.primary,
        size: 22,
      },
    };
  },
  computed: {
    mainClass() {
      return [
        this.$style['counter-input'],
        {
          [this.$style.min]: this.isMin,
          [this.$style.max]: this.isMax,
        },
      ];
    },
    isMin() {
      return this.inputValue === this.min;
    },
    isMax() {
      return this.inputValue === this.max;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.setValue(val || 0, false);
      },
    },
  },
  methods: {
    getCheckedValue(val) {
      if (val > this.max) {
        return this.max;
      }

      if (val < this.min) {
        return this.min;
      }

      return val;
    },
    setValue(val, needEmit = true) {
      const newValue = this.getCheckedValue(val);

      if (needEmit && newValue !== this.inputValue) {
        this.$emit('input', newValue);
      }

      this.inputValue = newValue;
    },
    increaseNumber() {
      this.setValue(this.inputValue + this.step);
    },
    decreaseNumber() {
      this.setValue(this.inputValue - this.step);
    },
  },
};
</script>

<style module>
.counter-input {
  display: flex;
  align-items: center;
}
.number {
  display: block;
  padding: 10px;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  cursor: default;
}
.button {
  background-color: var(--grayLighten);
  color: var(--primary);
  font-size: 18px;
  line-height: 1;
  width: 38px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.counter-input.min .btn-decrease {
  opacity: 0.5;
  pointer-events: none;
}

.counter-input.max .btn-increase {
  opacity: 0.5;
  pointer-events: none;
}
</style>
