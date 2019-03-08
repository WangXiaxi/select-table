<template>
  <div>
    <!-- popover -->
    <el-popover
      popper-class="el-select-table-popper"
      ref="popover"
      placement="bottom-start"
      trigger="click"
      v-model="visiblePopover">
      <el-table class="el-select-table" :row-class-name="tableRowClassName" @row-click="rowClick" :data="options" size="mini">
        <el-table-column :key="index" v-for='(item, index) in tableConfig' :width="item.width" :prop="item.keyName" :label="item.name" align="center"></el-table-column>
      </el-table>
    </el-popover>
    <div class="el-select-box" @mouseout.stop="mouseout" @mouseover.stop="mouseover" v-popover:popover>
      <!-- input single -->
      <div v-if="!(multiple === '' || multiple)" :class="`el-select el-select--${size}`">
        <div :class="`el-input el-input--${size} el-input--suffix`">
          <input ref="input" v-model="valSHow" type="text" readonly="readonly" autocomplete="off" :placeholder="placeholder ? placeholder : '请选择'" class="el-input__inner">
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i v-if="!showClose || !val || val.length === 0" class="el-select__caret el-input__icon el-icon-arrow-up" :class="{'is-reverse': visiblePopover}"></i>
              <i v-else class="el-select__caret el-input__icon el-icon-circle-close is-show-close" @click.stop="clearableAct"></i>
            </span>
          </span>
        </div>
      </div>
      <!-- input multiple -->
      <div v-else :class="`el-select spec-multiple-select el-select--${size}`">
        <div class="el-select__tags" ref="selectTags">
          <span><!-- 多选显示列表 -->
            <span v-for="item in valList" ref="tags" :key="item.__ob__.dep.id" class="el-tag el-tag--info el-tag--small" :class="{ 'el-tag--mini': size === 'mini' }">
              <span class="el-select__tags-text">{{item[valName]}}</span>
              <i class="el-tag__close el-icon-close" @click.stop="deleCur(item[valKey])"></i>
            </span>
          </span>
        </div>
        <div :class="`el-input el-input--${size} el-input--suffix`">
          <input ref="input" type="text" readonly="readonly" autocomplete="off" :placeholder="val.length === 0 ? (placeholder ? placeholder : '请选择') : ''" class="el-input__inner">
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i v-if="!showClose || !val || val.length === 0" class="el-select__caret el-input__icon el-icon-arrow-up" :class="{'is-reverse': visiblePopover}"></i>
              <i v-else class="el-select__caret el-input__icon el-icon-circle-close is-show-close" @click.stop="clearableAct"></i>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElSelectTable', // 命名规范
  components: {
  },
  props: [
    'value', // v-model接受值 多选请传数组
    'size', // 同 element size
    'valName', // 显示词
    'valKey', // 值
    'tableConfig', // 表头配置
    'options', // options配置
    'multiple', // 是否多选
    'clearable', // 是否显示清除按钮
    'placeholder' // placeholder
  ],
  data () {
    return {
      showClose: false, // 显示
      visiblePopover: false,
      val: '',
      inputHeight: 0 // 当前 高度
    }
  },
  created () {
    this.evaluate(this.value) // 赋值 处理
    this.$nextTick(() => {
      if (this.multipled) this.computeInitial() // 多选 计算
    })
  },
  mounted () {
  },
  computed: {
    multipled () {
      return this.multiple === '' || this.multiple
    },
    clearabled () {
      return this.clearable === '' || this.clearable
    },
    valSHow () { // 单选显示值
      const [cur] = this.options.filter(c => c[this.valKey] === this.val)
      return cur ? cur[this.valName] : ''
    },
    valList () { // 多选显示列表
      const val = this.val
      return this.options.filter(c => {
        for (const i in val) {
          if (val[i] === c[this.valKey]) return c
        }
      })
    }
  },
  methods: {
    deleCur (val) { // 多选 删除当前值
      this.val.splice(this.val.indexOf(val), 1)
    },
    computeHeight () { // 计算多选时 input 高度
      if (this.$refs.tags && this.$refs.tags[0]) {
        const height = this.$refs.selectTags.clientHeight // 获取高度
        const tagHeight = this.$refs.tags[0].clientHeight // 标签获取高度 不包含margin
        this.$refs.input.style.height = `${height + this.inputHeight - tagHeight - 6}px` // 计算input需要高度
      } else {
        this.$refs.input.style.height = `${this.inputHeight}px`
      }
      this.visiblePopover = !this.visiblePopover // 重置 po
      this.$nextTick(() => { this.visiblePopover = !this.visiblePopover })
    },
    computeInitial () { // 计算页面 进来时特定的值
      const elInput = this.$refs.input
      this.inputHeight = elInput.clientHeight + 2 // 多选 获取默认input 高度
      this.$refs.selectTags.style.maxWidth = `${elInput.clientWidth - 30}px` // 计算selectTags宽度
    },
    mouseover () { // 鼠标移入
      if (this.clearabled) this.showClose = true
    },
    mouseout () { // 鼠标移出
      if (this.clearabled) this.showClose = false
    },
    clearableAct () { // 清除数据操作
      this.val = this.multipled ? this.val.splice(0, this.val.length) : ''
      this.closed()
    },
    tableRowClassName ({ row, rowIndex }) { // 重置表格中点中样式
      if (!this.multipled && this.val === row[this.valKey]) return 'row-selected row-reset'
      if (this.multipled && this.val.indexOf(row[this.valKey]) > -1) return 'row-selected row-reset'
      return 'row-reset'
    },
    rowClick (row, event, column) { // 行点击选择
      const val = row[this.valKey]
      if (!this.multipled) {
        this.val = val
      } else {
        const index = this.val.indexOf(val)
        if (index > -1) {
          this.val.splice(index, 1)
        } else {
          this.val.push(val)
        }
      }
      this.closed()
    },
    closed () { // 关闭 并 聚焦
      if (!this.multipled) this.visiblePopover = false
    },
    evaluate (v) { // 赋值处理
      this.val = v
    },
    valid () { // 表单验证
      console.log('change2', this.$parent.prop)
      const prop = this.$parent.prop // 字段
      if (prop) this.$parent.form.validateField(prop)
    }
  },
  watch: {
    value (v) { // 监听值变动
      this.evaluate(v)
    },
    val (v) { // 值变动执行方法
      // 多选监听高度
      if (this.multipled) this.$nextTick(this.computeHeight)
      this.$emit('input', v)
      this.$nextTick(this.valid) // 表单验证
    },
    visiblePopover (v) { // 根据po是否显示判定input是否聚焦
      if (v) {
        this.$refs.input.focus()
      } else {
        this.$refs.input.blur()
      }
    }
  }
}
</script>
<style type="text/css">
  .el-select-box, .el-select-box .el-select {
    position: relative;
    width: 100%;
  }
  .el-select-table .row-reset {
    cursor: pointer;
  }
  .el-select-table .row-selected {
    color: #409eff;
    background: rgba(64, 158, 255, .1);
  }
  .el-select-table-popper {
    padding-top: 5px;
  }
  .el-select-table.el-table td, .el-select-table.el-table th {
    padding: 4px 0;
  }
</style>
