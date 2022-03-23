<template>
  <el-container>
    <el-header style="text-align: center;">
      <el-row>
        <el-col :span="12"><el-alert title="表单组件：1aa -- dadadadad" type="warning" center effect="dark" /></el-col>
        <el-col :span="12"><el-input v-model="fillPara" style="width: 300px" placeholder="序列参数" /> <el-button @click="fill(fillPara)">执行 fill</el-button></el-col>
      </el-row>
    </el-header>
    <el-main>
      <template>
        <el-form ref="form" v-loading="page.loading" :model="form" label-width="30%">
          <el-form-item>
            <el-input v-model="form.flowpos" />
          </el-form-item>
          <el-form-item>
            {{ form.CamID }}
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.CamIDx" />
          </el-form-item>
          <el-form-item label="摄像机名称">
            <el-input v-model="form.CamName" style="width:50px" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.Mimo" />
          </el-form-item>
          <el-form-item label="网络地址">
            <el-input v-model="form.UrlAddress" />
          </el-form-item>
          <el-form-item label="拉流方式">
            <el-select v-model="form.RtpType.selValue">
              <el-option v-for="item in form.RtpType.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="form.RunStat" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.AreaDicCode" />
          </el-form-item>
          <el-form-item label="是否推送消息">
            <el-input v-model="form.IsSendMsg" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.pid" />
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="form.fmem.selValue">
              <el-checkbox v-for="item in form.fmem.options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.modfmem" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.addtime" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.updatetime" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.dydata" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.stat" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.flow" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" round @click="submit(()=>{})">提交</el-button>
            <el-button type="primary" round @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-main>
  </el-container>
</template>
<script>
import { ftdpConfig } from '../utils/config.js'
import { ftdpBase } from '../utils/base.js'
// 配置
var apiBase = ftdpConfig.apiBase
var config = {
  apiGet: apiBase + '/demo/xxx?detail',
  apiSet: apiBase + '/demo/xxx?mod',
  tokenKey: ftdpConfig.tokenKey,
  tokenVal: ftdpConfig.getTokenLocal()
}
// 数据定义
var form = {
  flowpos: '',
  CamIDx: '',
  CamName: '',
  Mimo: '',
  UrlAddress: '',
  RtpType: {
    options: [],
    selValue: ''
  },
  RunStat: '',
  AreaDicCode: '',
  IsSendMsg: '',
  pid: '',
  fmem: {
    options: [],
    selValue: []
  },
  modfmem: '',
  addtime: '',
  updatetime: '',
  dydata: '',
  stat: '',
  flow: ''
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
    submit() {
      if (submit_before(this))ftdpBase.form_submit(config, this, form_paras, form_submit_json(this), () => { submit_after(this) })
    }
  }
}
var form_paras = ''
// 初始化数据定义
function init(vm, callback) {
  ftdpBase.optionsJson(config, vm, apiBase + '/demo/xxx?options', (json) => { form.RtpType.options = json; callback() })
  ftdpBase.optionsJson(config, vm, apiBase + '/demo/xxx?options', (json) => { form.fmem.options = json; callback() })

  callback()
}
// 表单填充定义
function form_fill_json(detail, vm) {
  form.CamName = detail.CamName // 摄像机名称
  form.UrlAddress = detail.UrlAddress // 网络地址
  form.Mimo = detail.Mimo // 描述
  // form.RtpType = detail.RtpType; //拉流方式
  // form.RunStat = detail.RunStat; //状态
  // form.AreaDicCode = detail.AreaDicCode; //位置
  form.IsSendMsg = detail.IsSendMsg // 是否推送消息
  form.CamID = detail.CamID // ID
  form.updatetime = detail.updatetime // updatetime
}
// 表单提交定义
function form_submit_json(vm) {
  var json = {}
  json['CamName'] = form.CamName // 摄像机名称
  json['UrlAddress'] = form.UrlAddress // 网络地址
  // json[''] = form.Mimo; //描述=>未匹配
  // json[''] = form.RtpType; //拉流方式=>未匹配
  // json[''] = form.RunStat; //状态=>未匹配
  // json[''] = form.AreaDicCode; //位置=>未匹配
  // json[''] = form.IsSendMsg; //是否推送消息=>未匹配
  // json[''] = form.CamID; //ID=>未匹配
  // json[''] = form.updatetime; //updatetime=>未匹配
  return json
}
// 载入前脚本，return false为阻止
function js_beforeget(vm) {
  alert('获取前')
  return true
}
// 赋值前脚本，return false为阻止
function js_beforeset(vm, resData) {
  alert('赋值前')
  return true
}
// 赋值后脚本
function js_afterset(vm, resData) {
  alert('赋值后')
}
// 提交前脚本，return false为阻止
function submit_before(vm) {
  alert('提交前')
  return true
}
// 提交后脚本
function submit_after(vm) {
  alert('提交后')
}
</script>
