<template>
  <div class="container-fluid" ref="container">
    <div class="editor">
      <!-- 工具栏 DOM 结构规约参考 Toolbar API -->
      <div id="toolbar" class="toolbar">
        <i data-command="undo" class="command iconfont icon-undo" title="撤销"></i>
        <i data-command="redo" class="command iconfont icon-redo" title="重做"></i>
        <span class="separator"></span>
        <i data-command="addBeginNode" class="command iconfont icon-to-back" title="新增起始节点"></i>
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
              </div>
            </div>
            <div data-status="edge-selected" class="pannel">
              <div class="pannel-title">边属</div>
              <div class="pannel-container"></div>
            </div>
            <div data-status="group-selected" class="pannel">
              <div class="pannel-title">群组</div>
              <div class="pannel-container"></div>
            </div>
            <div data-status="canvas-selected" class="pannel">
              <div class="pannel-title">画布</div>
              <div class="pannel-container"></div>
            </div>
            <div data-status="multi-selected" class="pannel">
              <div class="pannel-title">多选</div>
              <div class="pannel-container"></div>
            </div>
          </div>

          <div id="navigator">
            <div class="pannel-title">缩略图</div>
            <!-- 缩略图 DOM 结构规约参考 Minimap API -->
            <div id="minimap"></div>
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
// import G6 from '@antv/g6'
// import '@antv/g6/build/plugin.tool.tooltip'
// import BaseTable from 'components/base/table/baseTable'

/**
 * anchor某些情况下不起作用（尤其是自己画的图很乱时，g6会自己调节）
 */
const $http = () => {}
const isEmptyStr = data => {
  return !!data
}
// const objCopy = data => {
//   return JSON.parse(JSON.stringify(data))
// }
export default {
  components: {
    // BaseTable
  },
  data() {
    return {
      $http,
      conditionList: [], // 条件列表
      operatorList: [], // 操作符列表
      valueList: [], // 条件的值列表
      operatorMap: {}, // 操作符对象
      valueMap: {}, // 条件值对象
      gradeList: [
        { name: 'Ⅰ级', code: 1 },
        { name: 'Ⅱ级', code: 2 },
        { name: 'Ⅲ级', code: 3 },
        { name: 'Ⅳ级', code: 4 }
      ], // 级别列表
      levelList: [
        { name: '1级', code: 1 },
        { name: '2级', code: 2 },
        { name: '3级', code: 3 },
        { name: '4级', code: 4 }
      ], // 程度列表
      colorList: ['#FA8C16', '#1890FF', '#13C2C2', '#722ED1'], // 级别颜色列表
      fontSizeList: [24, 20, 16, 12],

      editor: null,
      selectedModel: {}, // 当前选中项数据模型
      curZoom: 1, // 当前缩放比率
      minZoom: 0.5, // 最小缩放比率
      maxZoom: 2, // 最大缩放比率

      condType: '',
      operator: '',
      value: '',
      grade: '',
      level: '',
      fontSize: '',
      color: 'red',
      /* 控制右侧详情面板的内容显现 start */
      showGrade: false,
      showOperator: false,
      showCond: false,
      showValue: true,
      showDisease: false,
      /* 控制右侧详情面板的内容显现 end */
      changeData: false,
      zoomSlider: 100, // 默认滑块取值为100
      valueFilterable: false, // 值下拉框是否可以检索
      /* 疾病选择弹窗 start */
      diseaseDialogVisible: false, // 显示疾病选择弹窗
      diseaseTableClass: 'disease-select-table',
      diseaseTableHeadClass: 'no-margin',
      diseaseColumns: [
        { label: '名称', prop: 'name' },
        { label: '编码', prop: 'code', width: '200' }
      ],
      selectDiseases: [], // 已选疾病列表
      /* 疾病选择弹窗 end */
      values: [],
      names: [],
      diseaseId: this.$route.query.diseaseId, // 当前疾病id
      diseaseName: this.$route.query.diseaseName, // 当前疾病名称
      diseaseSelectedLength: 0, // 当前已选疾病的条数
      hasInitNode: false // 是否已经初始化node
    }
  },
  created() {
    this.getAllConditions() // 获取所有的条件
  },
  mounted() {
    this.setEditorHeight() // 设置宽度和高度
    this.initG6Editor(true)
  },
  watch: {
    condType(curValue, oldValue) {
      console.log(curValue, oldValue)
      if (this.changeData) {
        if (curValue === '1') {
          this.valueFilterable = true
        } else {
          this.valueFilterable = false
        }
        if (!isEmptyStr(curValue)) {
          let label = this.getGraphLabel()
          console.log(label)
          this.updateGraph({
            condType: curValue,
            label: label
          })
        }
      }
    },
    operator(curValue, oldValue) {
      if (this.changeData) {
        if (!isEmptyStr(curValue)) {
          let label = this.getGraphLabel()
          this.updateGraph({
            operator: curValue,
            label: label
          })
        }
      }
    },
    grade(curValue, oldValue) {
      if (this.changeData) {
        if (!isEmptyStr(curValue)) {
          let label = ''
          let gradeObj = this.gradeList.find(item => {
            return item.code === curValue
          })
          label = gradeObj.name
          this.color = this.colorList[curValue - 1]
          this.updateGraph({
            label: label,
            grade: curValue,
            color: this.color
          })
        }
      }
    },
    level(curValue, oldValue) {
      if (this.changeData) {
        if (!isEmptyStr(curValue)) {
          let gradeObj = this.gradeList.find(item => {
            return item.code === this.grade
          })
          this.fontSize = this.fontSizeList[this.level - 1]
          this.updateGraph({
            level: curValue,
            label: {
              text: gradeObj.name,
              fontSize: this.fontSize
            }
          })
        }
      }
    },

    value(curValue, oldValue) {
      if (this.changeData) {
        if (!isEmptyStr(curValue)) {
          let valueObj = this.valueList.find(item => {
            return item.code === curValue
          })
          let label = this.getGraphLabel()
          this.updateGraph({
            label: label,
            value: curValue,
            values: [curValue],
            names: [valueObj.name]
          })
        }
      }
    }
  },
  methods: {
    setEditorHeight() {
      const bodyHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      let containarHeight = bodyHeight - 70
      containarHeight = containarHeight < 510 ? 510 : containarHeight
      this.$refs['container'].style.height = containarHeight + 'px'
    },
    /**
     * 获取所有的条件
     */
    getAllConditions() {
    },
    /**
     *根据条件列表，依次获取各条件下对应的operator和值（目的：将他们缓存起来，减少请求）
     */
    getEachOperatorAndValue() {
      this.conditionList.forEach((item, index) => {
        this.getOprsByCondi(item.code)
        this.getValsByCondi(item.code)
      })
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
          let beginNode = curPage.find(_self.diseaseId)
          if (!beginNode && _self.hasInitNode) {
            // 起始节点不存在
            return true
          } else {
            return false
          }
        },
        // 正向命令
        execute(editor) {
          let rootWidth = _self.diseaseName.length * 13
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
     * @param flag true 从接口获取图表数据；false:从缓存中获取图表数据（界面侧边栏收缩、展开）
     */
    initG6Editor(flag) {
    //   const _self = this
      let tempData = []
      if (!flag) {
        tempData = this.editor.getCurrentPage().save()
        this.editor.destroy()
      }
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
          height: 800
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
      if (flag) {
        this.getNodesByDiseaseId(this.diseaseId)
      } else {
        page.read(tempData)
      }
    },

    /**
     * 设置事件监听
     */
    setEventListenner() {
      const _self = this
      const curPage = this.editor.getCurrentPage()
      curPage.on('hoveranchor:beforeaddedge', ev => {
        let vm = ev.item.getModel()
        console.log(vm.shape, 'action: hoveranchor:beforeaddedge')
      })
      curPage.on('dragedge:beforeshowanchor', ev => {
        let vm = ev.item.getModel()
        console.log(vm.shape, 'action: dragedge:beforeshowanchor')
      })

      curPage.on('afteritemselected', ev => {
        let vm = ev.item.getModel()
        console.log(vm.shape, 'action: afteritemselected')
      })
      curPage.on('afterzoom', ev => {
        let zoom = ev.updateMatrix[0]
        _self.curZoom = zoom
        _self.zoomSlider = zoom * 100
      })
      this.editor.on('aftercommandexecute', ev => {
        console.log(ev, 'action: aftercommandexecute')
        if (ev.command.name === 'add') {
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

    enableChangeData() {
      this.changeData = true
    },
    condTypeSelectChange(value) {
      console.log('condTypeSelectChange')
      // this.updateGraph({
      //   condType: value,
      //   operator: this.operatorList[0].code,
      //   values: values,
      //   names: names,
      //   label: diseaseListStr,
      //   size: nodeWidth + '*48'
      // })
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
     * 获取图形的label
     */
    getGraphLabel() {
      let result = ''
      let conditionObj = this.conditionList.find(item => {
        return item.code === this.condType
      })
      let operotorObj = this.operatorList.find(item => {
        return item.code === this.operator
      })
      let valueObj = this.valueList.find(item => {
        return item.code === this.value
      })
      if (!isEmptyStr(conditionObj)) {
        result += conditionObj.name
      }
      if (!isEmptyStr(operotorObj)) {
        result += operotorObj.name
      }
      if (!isEmptyStr(valueObj)) {
        result += valueObj.name
      }
      return result
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
    // 显示疾病列表弹窗
    showDiseaseDialog() {
      this.selectDiseases = []
      for (let i = 0; i < this.values.length; i++) {
        this.selectDiseases.push({
          id: this.values[i],
          name: this.names[i]
        })
      }
      this.diseaseDialogVisible = true
      this.$nextTick(() => {
        // 下面的方法需要在$nextTick后执行
        this.$refs.diseaseTable.initTable() // 初始化疾病列表
      })
    },

    /**
     *疾病表格渲染后事件(标识已选择疾病)
     */
    afterRenderData(curDiseaseData) {
      curDiseaseData.forEach((item, index, arr) => {
        for (let i = 0; i < this.selectDiseases.length; i++) {
          if (this.selectDiseases[i].id === item.id) {
            this.$refs.diseaseTable.toggleRowSelection(item, true)
            break
          }
        }
      })
    },
    /**
     * 疾病表格数据行checkbox点击事件
     */
    diseaseSelect(selection, row) {
      if (!selection.includes(row)) {
        // 取消选择
        for (let i = 0, lenth = this.selectDiseases.length; i < lenth; i++) {
          if (this.selectDiseases[i].id === row.id) {
            this.selectDiseases.splice(i, 1)
            break
          }
        }
      } else {
        this.selectDiseases.push({
          id: row.id,
          name: row.name
        })
      }
    },

    /**
     * 疾病表格全选按钮点击事件
     */
    diseaseSelectAll(selection) {
      let curDiseaseData = this.$refs.diseaseTable.getTableData()
      if (selection.length === 0) {
        // 取消全选
        curDiseaseData.forEach((item, index, arr) => {
          for (let i = 0; i < this.selectDiseases.length; i++) {
            if (this.selectDiseases[i].id === item.id) {
              this.selectDiseases.splice(i, 1)
              break
            }
          }
        })
      } else {
        // 全选
        if (this.selectDiseases.length === 0) {
          // 当前没有已选疾病
          curDiseaseData.forEach((item, index, arr) => {
            this.selectDiseases.push({
              id: item.id,
              name: item.name
            })
          })
        } else {
          // 当前有已选疾病
          curDiseaseData.forEach((item, index, arr) => {
            let flag = false
            for (let i = 0; i < this.selectDiseases.length; i++) {
              if (this.selectDiseases[i].id === item.id) {
                flag = true
                break
              }
              if (i === this.selectDiseases.length - 1 && !flag) {
                this.selectDiseases.push({
                  id: item.id,
                  name: item.name
                })
              }
            }
          })
        }
      }
    },
    /**
     * 移除已选择的疾病
     * @param disease 当前移除的疾病数据
     */
    handleDiseaseClose(disease, index) {
      this.selectDiseases.splice(index, 1)
      let curDiseaseData = this.$refs.diseaseTable.getTableData()
      for (let i = 0; i < curDiseaseData.length; i++) {
        if (disease.id === curDiseaseData[i].id) {
          this.$refs.diseaseTable.toggleRowSelection(curDiseaseData[i], false)
          break
        }
      }
    },

    // 保存分级规则图
    saveGraph() {
      // const curPage = this.editor.getCurrentPage()
      // const graphData = curPage.save()
      // const nodes = graphData.nodes || []
      // const nodeList = curPage.getNodes()
      // nodes.forEach((item, index) => {
      //   // 只有新增/修改的锚点才会在dataMap中
      //   switch (item.shape) {
      //   }
      // })
    }
  }
}
</script>
<style type='text/css'>
    @import './css/g6.css'
</style>
