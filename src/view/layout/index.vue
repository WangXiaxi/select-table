<template>
  <div class="app-wrapper">
    <div class="top-container" v-if="isShowTop">
      <el-tag
        v-for="tag in tags"
        @click.native="goHere(tag.path)"
        :key="tag.name"
        :type="tag.type">
        {{tag.name}}
      </el-tag>
    </div>
    <div>
      <div class="left-container">
      </div>
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
      isShowTop: true,
      isRouterAlive: true,
      tags: [
        { name: '下拉表格', type: '', path: '/home' },
        { name: '流程树', type: 'success', path: 'tree-chart' },
        { name: 'antv-g6', type: 'success', path: 'antv-g6' }
      ]
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    goHere (path) {
      console.log(path)
      this.$router.push(path)
    }
  },
  watch: {
    '$route': {
      handler({ name }) {
        const notNeedTop = ['antv-g6']
        if (notNeedTop.findIndex(c => c === name) === -1) {
          this.isShowTop = true
        } else {
          this.isShowTop = false
        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
  .top-container {
    height: 100px;
    text-align: left;
  }
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
</style>
