<template>
  <div class="app-wrapper">
    <div class="top-container"></div>
    <div>
      <div class="left-container"></div>
      <div class="main-container">
        <router-view ref="routerview" v-if="isRouterAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>
<style scoped>
</style>
