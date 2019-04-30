<template>
  <!-- 工具栏 DOM 结构规约参考 Toolbar API -->
  <div id="toolbar" class="toolbar">
    <i data-command="addBeginNode" class="command iconfont anticon-file-add" title="新增起始节点"></i>
    <i data-command="undo" class="command iconfont icon-undo" title="撤销"></i>
    <i data-command="redo" class="command iconfont icon-redo" title="重做"></i>
    <span class="separator"></span>
    <i data-command="copy" class="command iconfont icon-copy-o" title="复制"></i>
    <i data-command="paste" class="command iconfont icon-paster-o" title="粘贴"></i>
    <i data-command="delete" class="command iconfont icon-delete-o" title="删除"></i>
    <i data-command="clear" class="command iconfont icon-to-back" title="清空画布"></i>
    <span class="separator"></span>
    <i data-command="zoomIn" class="command iconfont icon-zoom-in-o" title="放大"></i>
    <i data-command="zoomOut" class="command iconfont icon-zoom-out-o" title="缩小"></i>
    <i data-command="autoZoom" class="command iconfont icon-fit" title="适应画布"></i>
    <i data-command="resetZoom" class="command iconfont icon-actual-size-o" title="实际尺寸"></i>
    <span class="separator"></span>
    <i data-command="toBack" class="command iconfont icon-to-back" title="层级后置"></i>
    <i data-command="toFront" class="command iconfont icon-to-front" title="层级前置"></i>
    <span class="separator"></span>
    <i data-command="multiSelect" class="command iconfont icon-select" title="多选"></i>
    <i data-command="addGroup" class="command iconfont icon-group" title="成组"></i>
    <i data-command="unGroup" class="command iconfont icon-ungroup" title="解组"></i>
    <span class="separator"></span>
    <i data-command="save" class="command iconfont icon-to-back" title="保存"></i>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
export default {
  name: 'Toolbar', // 命名规范
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
      diseaseName: '我是起始节点：派大星',
      diseaseId: String(this._uid) // 起始节点 方便返回等定位
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
      this.setCustomCommand()
      const toolbar = new G6Editor.Toolbar({
        container: 'toolbar'
      })
      this.editor.add(toolbar)
    },
    /**
     * 设置自定义命令
     */
    setCustomCommand() {
      const _self = this
      const Command = G6Editor.Command
      // 保存命令
      Command.registerCommand('save', {
        queue: false, // 命令是否进入队列，默认是 true
        // 命令是否可用
        enable(eidtor) {
          return true
        },
        // 正向命令
        execute(eidtor) {
          _self.$parent.saveGraph()
        },
        shortcutCodes: [['ctrlKey', 's']] // 快捷键：Ctrl+s
      })
      // 新增起始节点命令
      Command.registerCommand('addBeginNode', {
        queue: true, // 命令是否进入队列，默认是 true
        // 命令是否可用
        enable(editor) {
          const curPage = editor.getCurrentPage()
          const nodes = curPage.getNodes()
          if (!nodes.length) {
            // 起始节点不存在
            return true
          } else {
            return false
          }
        },
        // 正向命令
        execute(editor) {
          let rootWidth = _self.diseaseName.length * 13 + 20
          rootWidth = rootWidth < 72 ? 72 : rootWidth
          const curPage = editor.getCurrentPage()
          curPage.add('node', {
            id: _self.diseaseId,
            shape: 'flow-circle',
            color: '#FA8C16',
            label: _self.diseaseName,
            x: 100,
            y: 100,
            size: rootWidth + '*72'
          })
        },
        // 反回命令
        back(editor) {
          console.log(1234)
          const curPage = editor.getCurrentPage()
          curPage.remove(_self.diseaseId)
        }
      })
      // 清空画布命令
      Command.registerCommand('clear', {
        // 命令是否可用
        enable(eidtor) {
          return true
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
