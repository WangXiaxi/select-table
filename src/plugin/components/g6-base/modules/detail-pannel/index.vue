<template>
  <!-- 详情面板栏 DOM 结构规约参考 Detailpannel API -->
  <div id="detailpannel" class="detailpannel">
    <div data-status="node-selected" class="pannel">
      <div class="pannel-title">节点</div>
      <div class="pannel-container">
        <el-form class="m10" ref="form" label-width="60px" size="mini">
          <el-form-item label="节点名称">
            <el-input v-model="nodeForm.label" @change="(v) => { this.nodeKeyChange('label', v) }"></el-input>
          </el-form-item>
          <el-col :span="12">
            <el-form-item label="宽" label-width="30px">
              <el-input v-model.number="nodeForm.width" @change="widthChange" @keydown.native="widthKeyDown"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高" label-width="30px">
              <el-input v-model.number="nodeForm.height" @change="heightChange" @keydown.native="heightKeyDown"></el-input>
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
        <el-form class="m10" ref="form" label-width="60px" size="mini">
          <el-form-item label="边属名称">
            <el-input v-model="nodeForm.label" @change="(v) => { this.nodeKeyChange('label', v) }"></el-input>
          </el-form-item>
          <div class="tl ml10">
            <el-color-picker v-model="nodeForm.color" @change="(v) => { this.nodeKeyChange('color', v) }"></el-color-picker>
          </div>
        </el-form>
      </div>
    </div>
    <div data-status="group-selected" class="pannel">
      <div class="pannel-title">群组</div>
      <div class="pannel-container">
        <el-form class="m10" ref="form" label-width="60px" size="mini">
          <el-form-item label="分组名称">
            <el-input v-model="nodeForm.label" @change="(v) => { this.nodeKeyChange('label', v) }"></el-input>
          </el-form-item>
          <div class="tl ml10">
            <el-color-picker v-model="nodeForm.color" @change="(v) => { this.nodeKeyChange('color', v) }"></el-color-picker>
          </div>
        </el-form>
      </div>
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
        <el-form class="m10" ref="form" label-width="60px" size="mini">
          <div class="tl ml10">
            <el-color-picker v-model="nodeForm.color" @change="(v) => { this.nodeKeyChange('color', v) }"></el-color-picker>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'
export default {
  name: 'DetailPannel', // 命名规范
  components: {
  },
  props: {
    nodeForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editor: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      toggleGridFlag: false
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 高度变动
     * @param v value
     */
    heightChange(v) {
      let val = parseFloat(v)
      if (!(val && val >= 1)) {
        val = 1
        this.nodeForm.height = 1
      }
      this.nodeKeyChange('size', `${this.nodeForm.width}*${val}`)
    },
    /**
     * 宽度变动
     * @param v value
     */
    widthChange(v) {
      let val = parseFloat(v)
      if (!(val && val >= 1)) {
        val = 1
        this.nodeForm.width = 1
      }
      this.nodeKeyChange('size', `${val}*${this.nodeForm.height}`)
    },
    /**
     * 宽度keydown
     * @param e event
     */
    widthKeyDown(e) { // 宽度keydown
      this.sizeKeydown('width', e)
    },
    /**
     * 高度度keydown
     * @param e event
     */
    heightKeyDown(e) { // 高度keydown
      this.sizeKeydown('height', e)
    },
    /**
     * 执行渲染keydown
     * @param key key
     * @param code 键盘按键
     */
    sizeKeydown(key, e) {
      const act = () => { // 执行操作赋值
        let wCopy = 1
        let hCopy = 1
        const { width, height } = this.nodeForm
        if (width > 1) {
          wCopy = width
        } else {
          this.nodeForm.width = 1
        }
        if (height > 1) {
          hCopy = height
        } else {
          this.nodeForm.height = 1
        }
        this.nodeKeyChange('size', `${wCopy}*${hCopy}`)
      }
      switch (e.code) {
        case 'ArrowDown':
          --this.nodeForm[key]
          act()
          e.preventDefault()
          break
        case 'ArrowUp':
          ++this.nodeForm[key]
          act()
          e.preventDefault()
          break
      }
    },
    /**
     * 初始化添加
     */
    init() {
      const detailpannel = new G6Editor.Detailpannel({
        container: 'detailpannel'
      })
      this.editor.add(detailpannel)
    },
    /**
     * node表单数据监听
     * @param k 需要更新的数据模型
     * @param v value
     */
    nodeKeyChange(k, v) {
      this.$parent.nodeKeyChange(k, v)
    },
    /**
     * 是否显示网格
     * @param v 是否显示
     */
    toggleGridChange(v) {
      const editor = this.editor
      const page = editor.getCurrentPage()
      if (v) {
        page.showGrid({ // 参考g6
          cell: 30, // 网孔尺寸
          line: { // 网格线样式
            stroke: '#333'
          }
        })
      } else {
        page.hideGrid()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
