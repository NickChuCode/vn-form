<template>
  <div>
    <h3>组合多选框</h3>
    <vn-checkbox v-model="single">单独选项</vn-checkbox>
    <br>
    数据：{{ single }}

    <br><br>

    <vn-checkbox-group v-model="multiple">
      <vn-checkbox label="option1">选项 1</vn-checkbox>
      <vn-checkbox label="option2">选项 2</vn-checkbox>
      <vn-checkbox label="option3">选项 3</vn-checkbox>
      <vn-checkbox label="option4">选项 4</vn-checkbox>
    </vn-checkbox-group>

    <br>
    数据：{{ multiple }}
  </div>
</template>
<script>
import vnCheckboxGroup from '../components/checkbox/checkbox-group'
import vnCheckbox from '../components/checkbox/checkbox'

export default {
  components: { vnCheckboxGroup, vnCheckbox },
  data () {
    return {
      single: false,
      multiple: ['option1']
    }
  }
}
</script>
