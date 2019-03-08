/**
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-01-26 11:04:39
 * @version $Id$
 */

export default function WithConsole (WrappedComponent) {
  return {
    mounted () {
      console.log('I have already mounted')
    },
    props: WrappedComponent.props,
    render (h) {
      return h(WrappedComponent, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: this.$props
      })
    }
  }
}
