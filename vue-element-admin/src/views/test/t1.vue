<template>
  <div>
    <el-row>
      <Warning />
      <test_list /></el-row>
  </div>
</template>
<script>
// import test1 from '@/ftdp/components/test1'
import test_list from '@/ftdp/components/test_list'
import Warning from '@/views/example/components/Warning'
export default {
  components: { test_list, Warning },
  data() {
    return {}
  }
}
</script>
