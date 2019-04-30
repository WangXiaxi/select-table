<template>
  <div class="container-fluid" ref="container">
    <div class="editor">
      <!-- 工具栏 DOM 结构规约参考 Toolbar API -->
      <toolbar :editor="editor"></toolbar>
      <div class="bottom-container">
        <!-- 元素面板栏 DOM 结构规约参考 Itempannel API -->
        <item-pannel :editor="editor"></item-pannel>
        <div class="right-side">
          <!-- 详情面板栏 DOM 结构规约参考 Detailpannel API -->
          <detail-pannel :nodeForm="nodeForm" :editor="editor"></detail-pannel>
          <!-- 缩略图 DOM 结构规约参考 Minimap API -->
          <draw-pannel :nodeForm="nodeForm" :editor="editor"></draw-pannel>
        </div>
        <!-- 右键菜单栏 DOM 结构规约参考 Contextmenu API -->
        <context-menu :editor="editor"></context-menu>
        <!-- 参考 Flow、Mind API -->
        <div id="page" class="page"></div>
      </div>
    </div>
  </div>
</template>

<script>
import modules from './modules'
import G6Editor from '@antv/g6-editor'
export default {
  components: {
    ...modules
  },
  data() {
    return {
      editor: null,
      nodeForm: { // 节点编辑承载表单
        label: '', // 承载节点名
        width: '', // 宽度
        height: '', // 高度
        color: '' // 背景颜色
      }
    }
  },
  created() {
    this.editor = new G6Editor()
  },
  mounted() {
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
      const model = {}
      model[k] = v
      this.updateGraph(model)
    },
    /**
     * 更新当前选中的节点
     * @param model 需要更新的数据模型 object
     * { // 节点
     *  id: 'node1', // id 必须唯一
     *  color: '#333', // 颜色（该颜色被认为是 ant-design-palettes 的6阶色，激
     *  活颜色、选中会根据该色值自动设置）
     *  size: 10 || [10, 10], // 尺寸 || [宽, 高]
     *  shape: 'circle', // 所用图形
     *  style: { // 关键形样式（优先级高于color）
     *  fill: 'red',
     *  stroke: 'blue'
     *  },
     *  label: '文本标签' || { // 文本标签 || 文本图形配置
     *  text: '文本标签',
     *  fill: 'green'
     *  },
     *  parent: 'group1', // 所属组
     *  index: 1, // 渲染层级
     * }
     * { // 边
     *   id: 'edge1', // id 必须唯一
     *   source: 'node1', // 源节点 id
     *   target: 'node2', // 目标节点 id
     *   controlPoints: [{ // 控制点
     *     x: 10,
     *     y: 10
     *   }],
     *   sourceAnchor: 0, // 源节点锚点
     *   targetAnchor: 2, // 目标节点锚点
     *   shape: 'line', // 所用图形
     *   style: { // 关键形样式（优先级高于color）
     *     fill: 'red',
     *     stroke: 'blue'
     *   },
     *   label: '文本标签' || { // 文本标签 || 文本图形配置
     *     text: '文本标签',
     *     fill: 'green'
     *   },
     *   labelRectStyle: { // 文本矩形底的样式
     *     fill: 'blue'
     *   },
     *   parent: 'group1', // 所属组
     *   index: 1, // 渲染层级
     * }
     */
    updateGraph(model) {
      const editor = this.editor
      editor.executeCommand(() => {
        const page = editor.getCurrentPage()
        const selectedItems = page.getSelected()
        selectedItems.forEach(item => {
          page.update(item, model)
        })
      })
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
     * 初始化g6Editor
     */
    initG6Editor() {
      this.$refs.container.style.height = `${this.setEditorHeight() + 42}px` // 设置下高度
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
        shape: 'flow-polyline-round' // line polyline quadratic cubic 与G6一样
      })
      this.editor.add(page)
      this.setEventListenner() // 设置事件监听
      const tempData = this.readLocalStorage()
      if (tempData) { // 简单处理
        page.read(JSON.parse(tempData)) // 读数据
      }
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
        const source = ev.source // 起始节点
        const sourceId = ev.source.id // 线的节点id
        const target = ev.target // 可选目标节点
        const targetId = target.model.id // 可选目标节点id
        // 例子 每个结点不能连自身
        if (sourceId === targetId) {
          ev.cancel = true // 取消连线
        }
        // 用来晒选等操作
        console.log(source, sourceId, target, targetId)
        console.log('action: dragedge: beforeshowanchor')
      })

      curPage.on('afteritemselected', ev => { // 选中节点事件
        let vm = ev.item.getModel()
        console.log(vm, 'action: afteritemselected')
        const { label, color, size } = vm
        console.log(label, color, size)
        Object.assign(this.nodeForm, {
          color,
          width: size ? size.split('*')[0] : undefined,
          height: size ? size.split('*')[1] : undefined,
          label
        })
      })
      curPage.on('afterzoom', ev => {
        let zoom = ev.updateMatrix[0]
        _self.curZoom = zoom
        _self.zoomSlider = zoom * 100
      })
      this.editor.on('aftercommandexecute', ev => { // 监听命令
        console.log(ev, 'action: aftercommandexecute')
        switch (ev.command.name) {
          case 'add': // 新增
            switch (ev.command.addModel.shape) {
              case 'flow-circle': // 节点一
                console.log('add: flow-circle')
                break
              case 'flow-rhombus': // 节点二
                console.log('add: flow-rhombus')
                break
              case 'flow-rect': // 节点三
                console.log('add: flow-rect')
                break
              case 'flow-capsule': // 节点四
                console.log('add: flow-capsule')
                break
            }
            break
          case 'redo': // 重做
            break
        }
      })
    },

    /**
     * 保存获取值操作
     */
    saveGraph() {
      const curPage = this.editor.getCurrentPage()
      const graphData = curPage.save()
      console.log('save', graphData)
      this.saveLocalStorage(JSON.stringify(graphData))
    },
    /**
     * 保存localStorage
     */
    saveLocalStorage(v) {
      const storage = window.localStorage
      storage['G6INFO'] = v
      this.$message.success('save successful!')
    },
    /**
     * 读localStorage
     */
    readLocalStorage(v) {
      const storage = window.localStorage
      return storage['G6INFO']
    }
  }
}
</script>
<style type='text/css'>
  @import './css/g6.css'
</style>
