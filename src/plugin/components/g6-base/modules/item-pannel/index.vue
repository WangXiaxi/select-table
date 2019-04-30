<template>
  <!-- 元素面板栏 DOM 结构规约参考 Itempannel API -->
  <div id="itempannel" class="itempannel">
    <div>
      <img
        v-for="(item, index) in nodes"
        :draggable="item.draggable"
        :src="item.src"
        :data-type="item.type"
        :data-shape="item.shape"
        :data-size="item.size"
        :data-color="item.color"
        :data-label="item.label"
        :key="index"
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
      nodes: [
        { label: '起止节点', color: '#FA8C16', shape: 'flow-circle', type: 'node', size: '72*72', draggable: 'true', src: 'https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg' },
        { label: '常规节点', color: '#1890FF', shape: 'flow-rect', type: 'node', size: '80*48', draggable: 'false', src: 'https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg' },
        { label: '分叉节点', color: '#13C2C2', shape: 'flow-rhombus', type: 'node', size: '80*72', draggable: 'false', src: 'https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg' },
        { label: '模型节点', color: '#722ED1', shape: 'flow-capsule', type: 'node', size: '80*48', draggable: 'false', src: 'https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg' }
      ]
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
