<template>
  <div :class="$style.navigation">
    <div
      v-for="item in items"
      :key="item.id"
      :class="[$style.item, {[$style['with-counter']]: item.count}]"
    >
      <div v-if="item.count" :class="$style.counter">
        {{ getCutNumber(item.count) }}
      </div>
      <router-link
        :to="item.path"
        :class="$style.link"
        :active-class="$style.active"
        exact
        >{{ item.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
import defaultTypes from '../constants/defaultTypes';

export default {
  name: 'Navigation',
  props: {
    items: defaultTypes.array(),
  },
  methods: {
    getCutNumber(val) {
      const number = Number(val);
      if (number > 99) {
        return '99+';
      }
      if (number < 0) {
        return '0';
      }
      return String(val);
    },
  },
};
</script>

<style module>
.navigation {
  display: flex;
  min-height: 40px;
  align-items: flex-end;
  padding: 30px 15px 20px;
}
.item {
  display: block;
  margin-right: 10px;
  position: relative;
}
.item:last-child {
  margin-right: 0;
}
.link {
  color: inherit;
  text-decoration: none;
}
.link.active {
  color: var(--secondary);
}
.counter {
  position: absolute;
  top: -15px;
  right: -25px;
  background-color: var(--secondary);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 10px;
  line-height: 1;
  font-weight: bold;
  cursor: default;
  user-select: none;
}
.item.with-counter {
  margin-right: 30px;
}
</style>
