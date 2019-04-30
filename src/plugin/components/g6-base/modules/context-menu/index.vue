<template>
  <!-- 右键菜单栏 DOM 结构规约参考 Contextmenu API -->
  <div id="contextmenu" class="contextmenu">
    <div data-status="node-selected" class="menu">
      <div data-command="copy" class="command">复制</div>
      <div data-command="paste" class="command">粘贴</div>
      <div data-command="delete" class="command">删除</div>
    </div>
    <div data-status="edge-selected" class="menu">
      <div ton data-command="delete" class="command">删除</div>
    </div>
    <div data-status="group-selected" class="menu">
      <div data-command="copy" class="command">复制</div>
      <div data-command="paste" class="command">粘贴</div>
      <div data-command="unGroup" class="command">解组</div>
      <div data-command="delete" class="command">删除</div>
    </div>
    <div data-status="canvas-selected" class="menu">
      <div data-command="undo" class="command">撤销</div>
      <div data-command="redo" class="command disable">重做</div>
    </div>
    <div data-status="multi-selected" class="menu">
      <div data-command="copy" class="command">复制</div>
      <div data-command="paste" class="command">粘贴</div>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'

export default {
  name: 'ContextMenu', // 命名规范
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
    init() {
      const contextmenu = new G6Editor.Contextmenu({
        container: 'contextmenu'
      })
      this.editor.add(contextmenu)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
