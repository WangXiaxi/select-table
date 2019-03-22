<template>
  <div class="tree-chart">
    <tree :nodes="treeConfigs" class="first"></tree>
  </div>
</template>

<script>
import tree from './children/tree.vue'

export default {
  name: 'treeChart', // 命名规范
  components: {
    tree
  },
  props: {
    treeConfigs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .tree-chart >>> * {
    padding: 0;
    margin: 0;
  }
  .tree-chart {
    position: relative;
    margin: 0 0;
    min-height: 800px;
    padding-left: 11px;
    overflow: auto;
  }
  .tree-chart >>> ul {
    width: 90px;
    height: 100%;
    position: absolute;
    text-align: left;
  }
  .tree-chart >>> .first>li>.line-before, .tree-chart >>> .first>li>.line-after {
    display: none !important;
  }
  .tree-chart >>> ul ul {
    left: 146px;
    top: 0;
  }
  .tree-chart >>> li {
    float: left;
    list-style-type: none;
    position: relative;
    padding: 0px 5px 70px 5px;
  }
  .tree-chart >>> li .box {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #F0F0F5;
    border-radius: 50%;
    text-decoration: none;
    color: #2D2D2D;
    font-size: 14px;
    line-height: 36px;
    text-align: center;
  }

  .tree-chart >>> li>.line-before {
    box-sizing:inherit;
    content: '';
    position: absolute;
    top: 19px;
    left: -102px;
    border-top: 2px solid #D2D2D7;
    width: 110px;
  }
  .tree-chart >>> li>.line-after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    top: -30%;
    left: -20px;
    height: 100%;
    border-left: 2px solid #D2D2D7;
  }
  .tree-chart >>> li:first-child>.line-after {
    height: 51%;
    border-left: 2px solid #D2D2D7;
    border-top: 2px solid #D2D2D7;
    top: 19px;
    width: 1px;
    border-top-left-radius: 4px;
  }
  .tree-chart >>> li:last-child>.line-after {
    height: 89%;
    border-left: 2px solid #D2D2D7;
    border-bottom: 2px solid #D2D2D7;
    top: -79px;
    width: 1px;
    border-bottom-left-radius: 4px;
  }
  .tree-chart >>> li:only-child>.line-after,
  .tree-chart >>> li:only-child>.line-before {
    display: none;
  }
  .tree-chart >>> ul ul li:only-child>.line-before {
    display: inline-block;
  }
  .tree-chart >>> li:not(:first-child)>.line-before {
    left: -19px;
    width: 24px;
    border-bottom-left-radius: 4px;
  }
</style>
