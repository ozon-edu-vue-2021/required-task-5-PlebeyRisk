<template>
  <div :class="$style.empty">
    {{ $attrs.text }}

    <span :class="$style['empty-description']">{{ $attrs.description }}</span>
  </div>
</template>

<style module>
.empty {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
.empty-description {
  margin-top: 10px;
  color: var(--gray);
  font-size: 16px;
  font-weight: 400;
  margin-top: 16px;
}
</style>
