<template>
  <div>
    <el-row>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <test_list />
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <test_add />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import test_list from '@/ftdp/components/test_list'
import test_add from '@/ftdp/components/test_add'
export default {
  components: { test_list, test_add },
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
