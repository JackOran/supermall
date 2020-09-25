<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         :key="item.id"
         class="tab-control-item"
         :class="{active:index === currentindex}" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentindex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentindex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
}

.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span {
  padding:3px;
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
.active {
  color: var(--color-high-text);
}
</style>
