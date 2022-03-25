<template>
  <el-container>
    <el-header>
      <el-input v-model="sdata.name" style="width:200px;margin-right:10px" />
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
  name: ''
}

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
    // 自定义脚本
    add() {
      this.$emit('add', null)
    },
    handleEdit(index, row) {
      this.$emit('handleEdit', row.fid)
    },
    handleDelete(index, row) {
      this.$emit('handleDelete', row.fid)
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
}
// 查询参数组织
function search_build(vm) {
  config.schText = ''
  config.schStrict = 'name:%' + sdata.name + '%'
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
