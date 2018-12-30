<template>
  <div>
    <h3>具有数据校验功能的表单组件</h3>
    <vn-form ref="form" :model="formValidate" :rules="ruleValidate">
      <vn-form-item label="用户名" prop="name">
        <vn-input v-model="formValidate.name"></vn-input>
      </vn-form-item>
      <vn-form-item label="邮箱" prop="mail">
        <vn-input v-model="formValidate.mail"></vn-input>
      </vn-form-item>
    </vn-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import vnForm from '../components/form/form'
import vnFormItem from '../components/form/form-item'
import vnInput from '../components/input/input'
export default {
  name: 'form',
  components: {
    vnForm,
    vnFormItem,
    vnInput
  },
  data () {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功')
        } else {
          window.alert('表单校验失败')
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
