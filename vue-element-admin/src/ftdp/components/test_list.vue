﻿<template>
  <el-container>
    <el-header>
      <el-input v-model="sdata.name" style="width:200px;margin-right:10px" />
      <el-select v-model="sdata.sex.selValue" style="width:200px;margin-right:10px">
        <el-option v-for="item in sdata.sex.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="sdata.education.selValue" style="width:200px;margin-right:10px">
        <el-option v-for="item in sdata.education.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="search()">搜索</el-button>
      <el-button type="success" @click="reset()">重置</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
      <el-button type="danger" plain @click="excel(0)">导出</el-button>
    </el-header>
    <el-main>
      <el-table v-loading="page.loading" :data="gridData.list" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
        <el-table-column label="客户姓名" property="name" sortable="custom" />
        <el-table-column label="客户电话" property="phone" />
        <el-table-column label="性别" property="sex" />
        <el-table-column label="学历" property="education" />
        <el-table-column label="生日" property="birthday" sortable="custom" />
        <el-table-column label="注释说明" property="mimo" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination layout="prev, pager, next" :page-count="page.count" background @current-change="handleCurrentChange" />
    </el-footer>
  </el-container>
</template>

<script>
import { ftdpConfig } from '../utils/config.js'
import { ftdpBase } from '../utils/base.js'
// 配置
var apiBase = ftdpConfig.apiBase
var config = {
  apiUrl: apiBase + '/test/test2?list',
  tokenKey: ftdpConfig.tokenKey,
  tokenVal: ftdpConfig.getTokenLocal(),
  orderBy: '',
  orderType: '',
  schText: '',
  schStrict: '',
  pageSize: 12,
  pageNum: 1
}
// 搜索数据定义
var sdata = {
  name: '',
  sex: {
    options: [{ value: '', label: '性别' }, { value: '1', label: '男' }, { value: '0', label: '女' }],
    selValue: ''
  },
  education: {
    options: [{ value: '', label: '学历' }],
    selValue: ''
  }
}

var orisdata = '{}'
export default {
  props: {
    loadauto: {
      type: String,
      default: '1'
    }
  },
  data: function() {
    return {
      gridData: { list: [] },
      multipleSelection: [],
      page: { count: 0, loading: false },
      sdata: sdata
    }
  },
  mounted: function() {
    init(this)
    orisdata = JSON.stringify(sdata)
    if (this.loadauto === '1')list_data_module(this)
  },
  methods: {
    load() {
      list_data_module(this)
    },
    search() {
      search_build(this)
      list_data_module(this)
    },
    reset() {
      ftdpBase.list_reset(sdata, orisdata)
      reset_build(this)
      list_data_module(this)
    },
    func(f) {
      const Fn = Function
      new Fn(f + '(this)')()
    },
    excel(maxRow, exportName) {
      ftdpBase.list_excel(config, this, maxRow, exportName)
    },
    selection() {
      return this.multipleSelection
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSortChange(val) {
      if (val.order == null) {
        config.orderBy = ''
        config.orderType = ''
      } else if (val.order === 'ascending') {
        config.orderBy = val.prop
        config.orderType = 'asc'
      } else {
        config.orderBy = val.prop
        config.orderType = 'desc'
      }
      list_data_module(this)
    },
    handleCurrentChange(val) {
      config.pageNum = val
      list_data_module(this)
    },
    get(apiPath, paras, callback) {
      ftdpBase.normal_get(this, ftdpConfig, apiPath, paras, callback)
    },
    post(apiPath, paras, json, callback) {
      ftdpBase.normal_post(this, ftdpConfig, apiPath, paras, json, callback)
    },
    // 自定义脚本
    add() {
      this.$emit('add', null)
    },
    handleEdit(index, row) {
      this.$emit('handleEdit', row.fid)
    },
    handleDelete(index, row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('/test/test2?delete', row.fid, null, () => {
          this.load()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
// 组件内部封装载入方法
function list_data_module(vm) {
  ftdpBase.list_data(config, vm, () => { return js_beforeload(vm) }, (resData) => { return js_beforeset(vm, resData) }, (resData) => { js_afterset(vm, resData) })
}
// 初始化数据定义，例如下拉搜索框的数据
function init(vm) {
  config.orderBy = ''
  config.orderType = ''
  config.schText = ''
  config.schStrict = ''
  config.pageSize = 12
  config.pageNum = 1
  ftdpBase.optionsJson(config, vm, apiBase + '/test/test2?dic/education', function(json) { sdata.education.options = sdata.education.options.concat(json) })
}
// 查询参数组织
function search_build(vm) {
  config.schStrict = '' +
		';name:%' + sdata.name + '%' +
		';sex:' + sdata.sex.selValue +
		';education:' + sdata.education.selValue
}
// 重置时的组织
function reset_build(vm) {
  config.orderBy = ''
  config.orderType = ''
  config.schText = ''
  config.schStrict = ''
  config.pageNum = 1
  vm.$set(vm.page, 'count', config.pageNum)
}
// 载入前脚本，return false为阻止
function js_beforeload(vm) {
  vm.$emit('beforeLoad', vm)
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
  vm.$emit('afterLoad', vm)
}
</script>
<style>
.el-header, .el-footer {
	text-align: right;
  }
</style>
