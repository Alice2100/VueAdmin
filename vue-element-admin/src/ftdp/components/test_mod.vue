<template>
  <el-form ref="form" :model="form" label-width="200px" label-position="left">
    <el-form-item label="客户姓名">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="客户电话">
      <el-input v-model="form.phone" />
    </el-form-item>

    <el-form-item label="性别">
      <el-radio-group v-model="form.sex.selValue">
        <el-radio v-for="item in form.sex.options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="学历(代码)">
      <el-select v-model="form.education.selValue">
        <el-option v-for="item in form.education.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <el-form-item label="生日">
      <el-date-picker v-model="form.birthday" />
    </el-form-item>

    <el-form-item label="描述">
      <el-input v-model="form.mimo" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit()">保存</el-button>
      <el-button type="success" @click="reset()">重置</el-button>
      <el-button type="info" @click="cancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ftdpConfig } from '../utils/config.js'
import { ftdpBase } from '../utils/base.js'
// 配置
var apiBase = ftdpConfig.apiBase
var config = {
  apiGet: apiBase + '/test/test2?get',
  apiSet: apiBase + '/test/test2?update',
  tokenKey: ftdpConfig.tokenKey,
  tokenVal: ftdpConfig.getTokenLocal()
}
// 数据定义
var form = {
  name: '',
  phone: '',
  sex: {
    options: [{ value: 1, label: '男' }, { value: 0, label: '女' }],
    selValue: ''
  },
  education: {
    options: [],
    selValue: ''
  },
  birthday: '',
  mimo: ''
}
var oriform = '{}'

export default {
  data: function() {
    return {
      form: form,
      page: { loading: false },
      fillPara: ''
    }
  },
  mounted: function() {
    init(this, () => { oriform = JSON.stringify(form) })
  },
  methods: {
    fill(paras) {
      form_paras = paras
      ftdpBase.form_fill(config, this, form_paras, (obj) => { form_fill_json(obj, this); oriform = JSON.stringify(form) }, () => { return js_beforeget(this) }, (resData) => { return js_beforeset(this, resData) }, (resData) => { js_afterset(this, resData) })
    },
    reset() {
      form_paras = ''
      var oform = JSON.parse(oriform)
      var keys = Object.keys(form)
      for (var ii = 0; ii < keys.length; ii++) if (oform[keys[ii]] != null)form[keys[ii]] = oform[keys[ii]]
    },
    func(f) {
      const Fn = Function
      new Fn(f + '(this)')()
    },
    submit() {
      if (submit_before(this))ftdpBase.form_submit(config, this, form_paras, form_submit_json(this), () => { submit_after(this) })
    },
    // 自定义脚本
    cancel() {
      this.$emit('cancel', null)
    }
  }
}
var form_paras = ''
// 初始化数据定义
function init(vm, callback) {
  ftdpBase.optionsJson(config, vm, apiBase + '/test/test2?dic/education', (json) => { form.education.options = json; callback() })

  callback()
}
// 表单填充定义
function form_fill_json(detail, vm) {
  form.name = detail.name // 客户姓名
  form.phone = detail.phone // 客户电话
  form.sex.selValue = detail.sex // 性别
  form.education.selValue = detail.education // 学历(代码)
  form.birthday = detail.birthday // 生日
  form.mimo = detail.mimo // 描述
}
// 表单提交定义
function form_submit_json(vm) {
  var json = {}
  json['name'] = form.name // 客户姓名
  json['phone'] = form.phone // 客户电话
  json['sex'] = form.sex.selValue // 性别
  json['education'] = form.education.selValue // 学历(代码)
  json['birthday'] = form.birthday // 生日
  json['mimo'] = form.mimo // 描述
  return json
}
// 载入前脚本，return false为阻止
function js_beforeget(vm) {
  vm.$emit('beforeGet', vm)
  return true
}
// 赋值前脚本，return false为阻止
function js_beforeset(vm, resData) {
// resData为接口返回对象
  vm.$emit('beforeSet', vm)
  return true
}
// 赋值后脚本
function js_afterset(vm, resData) {
// resData为接口返回对象
  vm.$emit('afterSet', vm)
}
// 提交前脚本，return false为阻止
function submit_before(vm) {
  vm.$emit('beforeSubmit', vm)
  return true
}
// 提交后脚本
function submit_after(vm) {
  vm.$emit('afterSubmit', vm)
}
</script>
<style>

</style>
