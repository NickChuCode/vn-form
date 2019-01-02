<template>
    <label>
        <span>
            <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="change">
            <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change">
        </span>
        <slot></slot>
    </label>
</template>
<script>
import { findComponentUpward } from '../../utils/assist.js'
import Emitter from '../../mixins/emitter.js'
export default {
  name: 'vnCheckbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    },
    // 因为要在 Checkbox 组件上直接使用 v-model 来双向绑定数据，
    // 那必不可少的一个 prop 就是 value，还有 event input，因为 v-model 本质上是一个语法糖
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    // 理论上，我们只需要给 value 设置为布尔值即可，也就是 true / false，
    // 不过为了扩展性，我们再定义两个 props：trueValue 和 falseValue，
    // 它们允许用户指定 value 用什么值来判断是否选中。
    // 因为实际开发中，数据库中并不直接保存 true / false，而是 1 / 0 或其它字符串，
    // 如果强制使用 Boolean，使用者就要再额外转换一次，这样的 API 设计不太友好。
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        // eslint-disable-next-line
        throw 'Value should be trueValue of falseValue'
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'vnCheckboxGroup')
    if (this.parent) this.group = true
    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false
      }

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)

      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('vnFormItem', 'on-form-change', value)
      }
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue
    }
  }
}
</script>
