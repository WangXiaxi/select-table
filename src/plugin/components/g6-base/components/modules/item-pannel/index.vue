<template>
  <!-- 元素面板栏 DOM 结构规约参考 Itempannel API -->
  <div id="itempannel" class="itempannel">
    <div>
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
        data-type="node"
        data-shape="flow-circle"
        data-size="72*72"
        data-color="#FA8C16"
        data-label="起止节点"
        class="getItem"
      >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg"
        data-type="node"
        data-shape="flow-rect"
        data-size="80*48"
        data-color="#1890FF"
        data-label="常规节点"
        class="getItem"
      >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg"
        data-type="node"
        data-shape="flow-rhombus"
        data-size="80*72"
        data-color="#13C2C2"
        data-label="分叉节点"
        class="getItem"
      >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg"
        data-type="node"
        data-shape="flow-capsule"
        data-size="80*48"
        data-color="#722ED1"
        data-label="模型节点"
        class="getItem"
      >
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
export default {
  name: 'ItemPannel', // 命名规范
  components: {
  },
  props: {
    editor: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化添加
     */
    init() {
      const itempannel = new G6Editor.Itempannel({
        container: 'itempannel'
      })
      this.editor.add(itempannel)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
