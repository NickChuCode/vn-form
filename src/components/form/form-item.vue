<template>
  <div>
    <label v-if="label" :class="{ 'vn-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="vn-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter'
import AsyncValidator from 'async-validator'
export default {
  name: 'vnFormItem',
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '' // 校验不通过时的提示信息
    }
  },
  computed: {
    // 从Form的model中动态得到当前表单组件的数据
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  inject: ['form'],
  // 组件渲染时，将实例缓存在Form中
  mounted () {
    // 如果没有传入prop, 则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch('vnForm', 'on-form-item-add', this)

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue

      this.setRules()
    }
  },
  // 组件销毁前，将实例从Form的缓存中移除
  beforeDestroy () {
    this.dispatch('vnForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      let rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required
        })
      }

      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    // 从Form的rules属性中，获取当前FormItem的校验规则
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    // 只支持blur和change，所以过滤出符合要求的rule规则
    getFilteredRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    /**
       * 校验数据
       * @param trigger 校验类型
       * @param callback 回调函数
       */
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)

      if (!rules || rules.length === 0) {
        return true
      }

      // 设置状态为校验中
      this.validateState = 'validating'

      // 以下为async-validator库的调用方法
      let descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      let model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      this.validate('change')
    },
    // 重置数据
    resetField () {
      this.validateState = ''
      this.validateMessage = ''

      this.form.model[this.prop] = this.initialValue
    }
  }
}
</script>

<style scoped lang="stylus">
  .vn-form-item-label-required:before
    content '*'
    color red
  .vn-form-item-message
    color red
</style>
