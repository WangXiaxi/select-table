<template>
  <tree-chart :treeConfigs="treeConfigs"></tree-chart>
</template>

<script>
export default {
  name: 'TreeExample',
  components: {
  },
  data () {
    return {
      treeConfigs: [
        {
          num: 1,
          children: [
            {
              num: 5,
              children: [
                {
                  num: 3,
                  children: [
                    {
                      num: 5,
                      children: [
                        {
                          num: 5,
                          children: [
                            {
                              num: 5,
                              children: [
                                {
                                  num: 3
                                }
                              ]
                            },
                            {
                              num: 5,
                              children: [
                                {
                                  num: 3
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  num: 3
                },
                {
                  num: 3
                }
              ]
            },
            {
              num: 2,
              children: [
                {
                  num: 5
                },
                {
                  num: 3,
                  children: [
                    {
                      num: 4
                    },
                    {
                      num: 3
                    },
                    {
                      num: 5
                    }
                  ]
                }
              ]
            },
            {
              num: 1
            }
          ]
        }
      ]
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

</style>
