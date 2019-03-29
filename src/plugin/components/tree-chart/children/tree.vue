<!--
  递归树
-->
<template>
  <ul>
    <li v-for="(item, index) in nodes" :key="index" :ref="`li-${index}`">
      <b class="line-before"></b>
      <div class="box">
        <!-- 节点信息 -->
        <span>{{item.num}}</span>
        <div class="info"></div>
        <div class="time"></div>
      </div>
      <tree v-if="item.children && item.children.length > 0" :nodes="item.children"></tree>
      <b class="line-after" :ref="`li-after-${index}`"></b>
    </li>
  </ul>
</template>
<script>
const height = 110
export default {
  props: ['nodes'],
  name: 'Tree',
  mounted () {
    const refs = this.$refs
    this.nodes.forEach((c, i) => { // 执行下由于线个marginBottom都需要计算所以不用computed不然要执行两遍
      const num = this.computedMarginBottom(c, i) // 计算得
      refs[`li-${i}`][0].style.marginBottom = `${num * height}px`
      const curHeight = refs[`li-after-${i}`][0].clientHeight
      refs[`li-after-${i}`][0].style.height = `${curHeight + num * height}px`
    })
  },
  methods: {
    computedMarginBottom (item, i) { // 计算每个节点需要距离几个高度的方法
      if (i === (this.nodes.length - 1)) return // 最后一个li不需要距离
      const computed = (c) => { // 递归计算当前需要距离下级几个高度
        if (!(c.children && c.children.length > 0)) return 0 // 没有子集 结束
        let num = c.children.length - 1
        c.children.forEach(k => {
          num = num + computed(k)
        })
        return num
      }
      return computed(item)
    }
  }
}
</script>
