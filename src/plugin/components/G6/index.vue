<template>
  <div class="container-fluid" ref="container">
    <div class="editor">
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
      <div style="height:42px"></div>
      <div class="bottom-container">
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
        <div class="right-side">
          <!-- 详情面板栏 DOM 结构规约参考 Detailpannel API -->
          <div id="detailpannel" class="detailpannel">
            <div data-status="node-selected" class="pannel">
              <div class="pannel-title">节点</div>
              <div class="pannel-container">
                <el-form class="m10" ref="form" :model="nodeForm" label-width="60px" size="mini">
                  <el-form-item label="节点名称">
                    <el-input v-model="nodeForm.label" @change="(v) => { this.nodeKeyChange('label', v) }"></el-input>
                  </el-form-item>
                  <el-col :span="12">
                    <el-form-item label="宽" label-width="30px">
                      <el-input v-model="nodeForm.width" @change="(v) => { this.nodeKeyChange('size', `${v}*${nodeForm.height}`) }"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="高" label-width="30px">
                      <el-input v-model="nodeForm.height" @change="(v) => { this.nodeKeyChange('size', `${nodeForm.width}*${v}`) }"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
                <div class="tl ml10">
                  <el-color-picker v-model="nodeForm.color" @change="(v) => { this.nodeKeyChange('color', v) }"></el-color-picker>
                </div>
              </div>
            </div>
            <div data-status="edge-selected" class="pannel">
              <div class="pannel-title">边属</div>
              <div class="pannel-container">
                <el-form class="m10" ref="form" :model="edgeForm" label-width="60px" size="mini">
                  <el-form-item label="边属名称">
                    <el-input v-model="edgeForm.label"></el-input>
                  </el-form-item>
                  <div class="tl ml10">
                    <el-color-picker v-model="edgeForm.color"></el-color-picker>
                  </div>
                </el-form>
              </div>
            </div>
            <div data-status="group-selected" class="pannel">
              <div class="pannel-title">群组</div>
              <div class="pannel-container"></div>
            </div>
            <div data-status="canvas-selected" class="pannel">
              <div class="pannel-title">画布</div>
              <div class="pannel-container">
                <el-checkbox class="m10" v-model="toggleGridFlag" @change="toggleGridChange">网格对齐</el-checkbox>
              </div>
            </div>
            <div data-status="multi-selected" class="pannel">
              <div class="pannel-title">多选</div>
              <div class="pannel-container">
                <el-form class="m10" ref="form" :model="moreForm" label-width="60px" size="mini">
                  <div class="tl ml10">
                    <el-color-picker v-model="moreForm.color" @change="moreColorChange"></el-color-picker>
                  </div>
                </el-form>
              </div>
            </div>
          </div>

          <div id="navigator">
            <div class="pannel-title">缩略图</div>
            <!-- 缩略图 DOM 结构规约参考 Minimap API -->
            <div id="minimap">
            </div>
            <div class="zoom-slider">
              <div class="slider-outer-ctn">
                <el-slider
                  v-model="zoomSlider"
                  :format-tooltip="formatTooltip"
                  @change="changeZoom"
                  :min="minZoom * 100"
                  :max="maxZoom * 100"
                ></el-slider>
              </div>
              <el-dropdown class="dropdown-inner-ctn" @command="handleDropdownChange">
                <span class="el-dropdown-link">
                  {{Math.ceil(curZoom * 100)}} %
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0.5">50%</el-dropdown-item>
                  <el-dropdown-item command="1">100%</el-dropdown-item>
                  <el-dropdown-item command="1.5">150%</el-dropdown-item>
                  <el-dropdown-item command="2">200%</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
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
        <!-- 参考 Flow、Mind API -->
        <div id="page" class="page"></div>
      </div>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
export default {
  components: {
  },
  data() {
    return {
      editor: null,
      curZoom: 1, // 当前缩放比率
      minZoom: 0.5, // 最小缩放比率
      maxZoom: 2, // 最大缩放比率
      /* 控制右侧详情面板的内容显现 start */
      zoomSlider: 100, // 默认滑块取值为100
      valueFilterable: false, // 值下拉框是否可以检索
      /* 疾病选择弹窗 start */
      diseaseDialogVisible: false, // 显示疾病选择弹窗
      diseaseTableClass: 'disease-select-table',
      diseaseTableHeadClass: 'no-margin',
      toggleGridFlag: false,
      diseaseName: '我是起始节点：派大星',
      nodeForm: { // 节点编辑承载表单
        label: '', // 承载节点名
        width: '', // 宽度
        height: '', // 高度
        color: '' // 背景颜色
      },
      edgeForm: { // 边属编辑承载表单
        label: '', // 边属名称
        color: '' // 颜色
      },
      moreForm: { // 多选节点承载表单
        color: '' // 节点颜色
      }
    }
  },
  created() {
  },
  mounted() {
    this.$refs.container.style.height = `${this.setEditorHeight() + 42}px`
    this.initG6Editor()
  },
  watch: {
  },
  methods: {
    /**
     * node表单数据监听
     * @param k 需要更新的数据模型
     * @param v value
     */
    nodeKeyChange(k, v) {
      const param = {}
      param[k] = v
      this.updateGraph(param)
    },
    /**
     * 多选颜色变动联动
     * @param color 需要更新的数据模型
     */
    moreColorChange(color) { // 多选颜色变动联动 监听不合适
      this.updateGraph({ color })
    },
    /**
     * 更新当前选中的节点
     * @param updateModel 需要更新的数据模型 object
     */
    updateGraph(updateModel) {
      const editor = this.editor
      editor.executeCommand(() => {
        const page = editor.getCurrentPage()
        const selectedItems = page.getSelected()
        selectedItems.forEach(item => {
          page.update(item, updateModel)
        })
      })
    },
    /**
     * 是否显示网格
     * @param v 是否显示
     */
    toggleGridChange(v) {
      const editor = this.editor
      const page = editor.getCurrentPage()
      if (v) {
        page.showGrid()
      } else {
        page.hideGrid()
      }
    },
    /**
     * 获取高度
     */
    setEditorHeight() {
      const bodyHeight = document.documentElement.clientHeight || document.body.clientHeight
      let containarHeight = bodyHeight - 42
      containarHeight = containarHeight < 510 ? 510 : containarHeight
      return containarHeight
    },
    /**
     * 根据条件获取操作列表
     * @param condiIdx 条件index
     */
    getOprsByCondi(condiIdx) {
      console.log(condiIdx, 'getOprsByCondi')
    },

    /**
     * 获取条件的值列表
     */
    getValsByCondi(condiIdx, keyWord) {
      console.log(condiIdx, keyWord, 'getValsByCondi')
    },
    getNodesByDiseaseId(diseaseId) {
      console.log(diseaseId, 'getNodesByDiseaseId')
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
          _self.saveGraph()
        },
        shortcutCodes: [['ctrlKey', 'shiftKey', 's']] // 快捷键：Ctrl+shirt+s
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
            size: rootWidth + '*72',
            category: 0
          })
        },
        // 反向命令
        back(editor) {
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
    },
    /**
     * 初始化g6Editor
     */
    initG6Editor() {
      this.editor = new G6Editor()
      this.setCustomCommand()
      const minimap = new G6Editor.Minimap({
        container: 'minimap'
      })
      const toolbar = new G6Editor.Toolbar({
        container: 'toolbar'
      })
      const contextmenu = new G6Editor.Contextmenu({
        container: 'contextmenu'
      })
      const itempannel = new G6Editor.Itempannel({
        container: 'itempannel'
      })
      const detailpannel = new G6Editor.Detailpannel({
        container: 'detailpannel'
      })
      const page = new G6Editor.Flow({
        graph: {
          container: 'page',
          height: this.setEditorHeight()
        },
        shortcut: {
          save: true
        },
        noEndEdge: false // 不允许悬空边
      })

      page.getGraph().edge({
        shape: 'flow-polyline-round'
      })

      this.editor.add(minimap)
      this.editor.add(toolbar)
      this.editor.add(contextmenu)
      this.editor.add(itempannel)
      this.editor.add(detailpannel)
      this.editor.add(page)
      this.setEventListenner() // 设置事件监听
      // const tempData = {}
      // page.read(tempData) // 读数据
    },

    /**
     * 设置事件监听
     */
    setEventListenner() {
      const _self = this
      const curPage = this.editor.getCurrentPage()
      curPage.on('hoveranchor:beforeaddedge', ev => { // 监听显示锚点事件
        let vm = ev.item.getModel()
        console.log(vm.shape, 'action: hoveranchor:beforeaddedge')
      })
      curPage.on('dragedge:beforeshowanchor', ev => { // 监听显示锚点虚线事件
        console.log('action: dragedge:beforeshowanchor')
      })

      curPage.on('afteritemselected', ev => { // 选中节点事件
        let vm = ev.item.getModel()
        console.log(vm, 'action: afteritemselected')
        const { type, label, color } = vm
        switch (type) {
          case 'node': // node
            const { size } = vm
            Object.assign(this.nodeForm, {
              color,
              width: size.split('*')[0],
              height: size.split('*')[1],
              label
            })
            Object.assign(this.moreForm, { // 选中节点填充下多选
              color
            })
            break
          default: // edge 默认没有color label
            Object.assign(this.edgeForm, {
              label,
              color
            })
            break
        }
      })
      curPage.on('afterzoom', ev => {
        let zoom = ev.updateMatrix[0]
        _self.curZoom = zoom
        _self.zoomSlider = zoom * 100
      })
      this.editor.on('aftercommandexecute', ev => { // 监听命令
        console.log(ev, 'action: aftercommandexecute')
        if (ev.command.name === 'add') { // 添加节点
          switch (ev.command.addModel.shape) {
            case 'flow-circle': // 节点二
              console.log('add:flow-circle')
              break
            case 'flow-rhombus': // 节点二
              console.log('add:flow-rhombus')
              break
            case 'flow-rect': // 节点三
              console.log('add:flow-rect')
              break
            case 'flow-capsule': // 节点四
              console.log('add:flow-capsule')
              break
          }
        }
      })
    },

    /**
     * 格式化滑块的label
     * @param val 滑块值
     * @returns {number} 滑块label
     */
    formatTooltip(val) {
      return val + '%'
    },

    /**
     * 修改zoom值
     * @param value
     */
    changeZoom(value) {
      const editor = this.editor
      const page = editor.getCurrentPage()
      let zoom = value / 100
      page.zoom(zoom)
    },
    /**
     * zoom下拉框值改变事件
     * @param common
     */
    handleDropdownChange(common) {
      let zoom = Number(common)
      const editor = this.editor
      const page = editor.getCurrentPage()
      this.zoomSlider = zoom * 100
      page.zoom(zoom)
      this.curZoom = zoom
    },

    /**
     * 保存获取值操作
     */
    saveGraph() {
      const curPage = this.editor.getCurrentPage()
      const graphData = curPage.save()
      console.log('save', graphData)
    }
  }
}
</script>
<style type='text/css'>
    @import './css/g6.css'
</style>
