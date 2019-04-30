<template>
  <div id="drawpannel" class="drawpannel">
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
          <el-dropdown-item
            v-for="(item, index) in ctnOptions"
            :command="item"
            :key="index"
          >{{item * 100}}%</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor'

export default {
  name: 'DrawPannel', // 命名规范
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
      ctnOptions: [ 0.5, 1, 1.5, 2 ], // 缩放下拉
      curZoom: 1, // 当前缩放比率
      minZoom: 0.5, // 最小缩放比率
      maxZoom: 2, // 最大缩放比率
      zoomSlider: 100, // 默认滑块取值为100
      valueFilterable: false // 值下拉框是否可以检索
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
      const minimap = new G6Editor.Minimap({
        container: 'minimap'
      })
      this.editor.add(minimap)
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
