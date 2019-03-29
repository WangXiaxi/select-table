<template>
  <div>
    <el-form ref="formx" :model="ruleForm" :rules="rules" label-width="80px">
      {{ ruleForm.param1 }}
      <el-form-item label="测试多选" prop="param1">
        <el-select-table
          style="width: 100px;"
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
      {{ ruleForm.param2 }}
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
      <el-button @click="submit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Home', // 命名规范
  components: {
  },
  data () {
    return {
      value: '',
      input: '',
      tableConfig: [ // table 配置表头
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
        { v: 4, t: '测试4', x: '二年级一班', y: 19 },
        { v: 5, t: '测试5', x: '二年级一班', y: 18 },
        { v: 6, t: '测试6', x: '二年级一班', y: 19, disabled: true }
      ],
      ruleForm: {
        param1: [],
        param2: ''
      },
      rules: {
        param1: [
          { required: true, message: '请选择多选', trigger: 'blur' }
        ],
        param2: [
          { required: true, message: '请选择单选' }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    submit () {
      this.$refs.formx.validate(v => {
        console.log(v)
      })
    }
  },
  watch: {
    'ruleForm.param1' (v) {
      console.log('change1', v)
    },
    'ruleForm.param2' (v) {
      console.log('change2', v)
    }
  }
}
</script>

<style scoped>

</style>
