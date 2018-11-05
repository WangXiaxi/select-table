<template>
  <div>
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="测试多选" prop="param1">
        <el-select-table
          style="width: 300px;"
          v-model="ruleForm.param1"
          size="medium"
          val-key="v"
          val-name="t"
          :table-config="tableConfig"
          :options="options"
          clearable
          multiple
          placeholder="请选择选项"
          ></el-select-table>
      </el-form-item>

      <el-form-item label="测试单选" prop="param2">
        <el-select-table
          style="width: 300px;"
          v-model="ruleForm.param2"
          size="medium"
          val-key="v"
          val-name="t"
          :table-config="tableConfig"
          :options="options"
          clearable
          placeholder="请选择选项"
          ></el-select-table>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'home', // 命名规范
  components: {
  },
  data () {
    return {
      tableConfig: [
        {
          keyName: 'v',
          name: '序号',
          width: 60
        },
        {
          keyName: 't',
          name: '姓名',
          width: 100
        },
        {
          keyName: 'x',
          name: '班级',
          width: 100
        },
        {
          keyName: 'y',
          name: '年龄',
          width: 100
        }
      ],
      options: [
        { v: 1, t: '测试1', x: '二年级二班', y: 18 },
        { v: 2, t: '测试2', x: '二年级三班', y: 28 },
        { v: 3, t: '测试3', x: '二年级一班', y: 18 },
        { v: 4, t: '测试4', x: '二年级一班', y: 19 }
      ],
      ruleForm: {
        param1: [],
        param2: ''
      },
      rules: {
        param1: [
          { required: true, message: '请选择内容' }
        ],
        param2: [
          { required: true, message: '请选择内容' }
        ]
      }
    }
  },
  created () {
    // setTimeout(() => {
    //   this.$refs.form.validate(v => {
    //     console.log(v)
    //   })
    // }, 3000)
  },
  mounted () {
  },
  methods: {

  },
  watch: {
    'ruleForm.tablex' (v) {
      console.log('change', v)
    }
  }
}
</script>

<style scoped>

</style>
