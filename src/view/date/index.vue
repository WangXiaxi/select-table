<template>
  <div class="block">
    <span class="demonstration">月</span>
    <el-date-picker
      v-model="value4"
      :picker-options="xxxx"
      type="month"
      placeholder="选择月">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'date', // 命名规范
  components: {
  },
  data () {
    const date = ['2018/1/', '2018/3/', '2018/4/']
    return {
      value4: null,
      xxxx: {
        disabledDate: (time) => {
          return date.filter(c => {
            return time.toLocaleDateString().indexOf(c) > -1
          }).length > 0
        }
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {

  },
  watch: {
  }
}
</script>
