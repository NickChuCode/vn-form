<template>
    <label>
        <span>
            <input
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change">
        </span>
        <slot></slot>
    </label>
</template>
<script>
import Emitter from '../../mixins/emitter.js'
export default {
  name: 'vnCheckbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
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
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw 'Value should be trueValue of falseValue'
      }
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
      this.$emit('on-change', value)
      this.dispatch('vnFormItem', 'on-form-change', value)
    },
    updateModel () {
      this.currentValue = this.value = this.trueValue
    }
  }
}
</script>