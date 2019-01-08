<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row">
        <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      // 对象或者数组默认值必须从一个工厂函数中获取
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
table
  width 100%
  border-collapse collapse
  border-spacing 0
  empty-cells show
  border 1px solid #e9e9e9
  th
    background #f7f7f7
    color #5c6b77
    font-weight 600
    white-space nowrap
  th, td
    padding 8px 16px
    border 1px solid #e9e9e9
    text-align left
</style>
