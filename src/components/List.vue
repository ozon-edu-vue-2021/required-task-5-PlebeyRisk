<template>
  <div :class="$style.list">
    <template v-if="haveItems">
      <div :class="$style.header">
        <slot name="header">
          <div :class="$style.actions">
            <div
              :class="[$style['action-wrapper'], $style['select-all-button']]"
            >
              <label for="selected-all-input" :class="$style.action">
                <input
                  type="checkbox"
                  id="selected-all-input"
                  :checked="isAllSelectedInputValue"
                  :class="$style.checkbox"
                  @change="onSelectAllClick"
                />
                Выбрать все
              </label>
            </div>

            <div
              v-if="selectedItemsIds.length"
              :class="[
                $style['action-wrapper'],
                $style['delete-selected-button'],
              ]"
            >
              <MyButton
                :class="$style.action"
                onlyText
                @click="onDeleteSelectedClick"
              >
                Удалить выбранные
              </MyButton>
            </div>
          </div>
        </slot>
      </div>

      <div v-if="haveItems" :class="$style['item-list']">
        <template v-if="$scopedSlots.item">
          <div
            v-for="(item, index) in items"
            :key="item.id"
            :class="$style.item"
          >
            <slot
              name="item"
              v-bind="{
                item,
                index,
                selectItem,
                unselectItem,
                toggleSelect,
                isSelected: isItemSelected(item),
              }"
            ></slot>
          </div>
        </template>
      </div>
    </template>

    <template v-else>
      <slot name="empty"></slot>
    </template>
  </div>
</template>

<script>
import MyButton from '../components/MyButton.vue';
import defaultTypes from '../constants/defaultTypes';

export default {
  name: 'List',
  components: {
    MyButton,
  },
  props: {
    items: defaultTypes.array(),
    selected: defaultTypes.array(),
    itemKey: defaultTypes.string('id'),
  },
  model: {
    prop: 'selected',
    event: 'select',
  },
  data() {
    return {
      selectedItemsIds: [],
    };
  },
  computed: {
    haveItems() {
      return this.items?.length;
    },
    isAllSelectedInputValue() {
      return this.selectedItemsIds?.length === this.items?.length;
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler(val) {
        this.selectedItemsIds = val || [];
      },
    },
  },
  methods: {
    selectItem(item) {
      const itemId = item?.[this.itemKey];

      if (
        itemId === undefined ||
        itemId === null ||
        this.isItemSelected(item)
      ) {
        return;
      }

      this.selectedItemsIds = [...this.selectedItemsIds, itemId];

      this.emitChanges();
    },
    toggleSelect(item) {
      if (this.isItemSelected(item)) {
        this.unselectItem(item);
        return;
      }

      this.selectItem(item);
    },
    emitChanges() {
      this.$emit('select', this.selectedItemsIds);
    },
    unselectItem(item) {
      this.selectedItemsIds = this.selectedItemsIds.filter(
        (id) => id !== item?.[this.itemKey]
      );

      this.emitChanges();
    },
    isItemSelected(item) {
      return this.selectedItemsIds.includes(item?.[this.itemKey]);
    },
    onSelectAllClick() {
      const isAllSelected =
        this.selectedItemsIds?.length === this.items?.length;

      if (isAllSelected) {
        this.selectedItemsIds = [];
      } else {
        this.selectedItemsIds = this.items.map((item) => item?.[this.itemKey]);
      }

      this.emitChanges();
    },
    onDeleteSelectedClick() {
      this.$emit('delete-selected');
    },
  },
};
</script>

<style module>
.list {
  background-color: var(--white);
}
.header {
  border-bottom: 1px solid var(--grayLighten);
  padding: 10px 24px;
}
.item-list {
  padding: 0 24px;
}
.item {
  border-bottom: 1px solid var(--grayLighten);
}
.item:last-child {
  border-bottom: none;
}
.actions {
  display: flex;
  min-height: 32px;
}
.action-wrapper {
  margin-right: 20px;
}
.action-wrapper:last-child {
  margin-right: 0;
}
.action {
  font-weight: 400;
  padding: 0;
  font-size: 14px;
  line-height: 1.29;
  cursor: pointer;
}
.select-all-button {
  display: flex;
  align-items: center;
}
.select-all-button .action {
  display: flex;
  align-items: center;
}

.select-all-button .action .checkbox {
  margin-top: -4px;
  margin-right: 10px;
  cursor: pointer;
}

.delete-selected-button .action {
  color: var(--secondary);
}
</style>
