<template>
  <div class="main">
    <el-row>
      <test_list ref="test_list" @add="listAdd" @handleEdit="listEdit" @handleDelete="listDelete" />
    </el-row>
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="60%">
      <test_add ref="test_add" @cancel="addCancel" @afterSubmit="addAfterSubmit" />
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="modDialogVisible" width="60%" @opened="modDialogOpened" @closed="modDialogClosed">
      <test_mod ref="test_mod" @cancel="modCancel" @afterSubmit="modAfterSubmit" />
    </el-dialog>
  </div>

</template>
<script>
import test_list from '@/ftdp/components/test_list'
import test_add from '@/ftdp/components/test_add'
import test_mod from '@/ftdp/components/test_mod'
export default {
  components: { test_list, test_add, test_mod },
  data() {
    return {
      addDialogVisible: false,
      modDialogVisible: false,
      modId: null
    }
  },
  methods: {
    listAdd() {
      this.addDialogVisible = true
    },
    listEdit(id) {
      this.modId = id
      this.modDialogVisible = true
    },
    modDialogOpened() {
      this.$refs.test_mod.fill(this.modId)
    },
    modDialogClosed() {
      this.$refs.test_mod.reset(true)
    },
    listDelete(id) {
    },
    addCancel() {
      this.addDialogVisible = false
    },
    addAfterSubmit() {
      this.addDialogVisible = false
      this.$refs.test_list.load()
      this.$refs.test_add.reset()
    },
    modCancel() {
      this.modDialogVisible = false
    },
    modAfterSubmit() {
      this.modDialogVisible = false
      this.$refs.test_list.load()
    }
  }
}
</script>
<style>
  .main {
    margin:20px;
  }
</style>
