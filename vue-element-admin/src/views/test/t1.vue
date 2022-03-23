<template>
  <div>
    <el-row>
      <Warning />
      <test1 />
    </el-row>
  </div>
</template>
<script>
import test1 from '@/ftdp/components/test1'
import Warning from '@/views/example/components/Warning'
export default {
  components: { test1, Warning },
  data() {
    return {}
  }
}
</script>
