<template>
    <div class="order-container">
      <el-card>
        <el-table size="small">
          <el-table-column label="订单创建时间"></el-table-column>
          <el-table-column label="订单号"></el-table-column>
          <el-table-column label="产品信息"></el-table-column>
          <el-table-column label="用户信息"></el-table-column>
          <el-table-column label="金额"></el-table-column>
          <el-table-column label="备注"></el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
    export default {
      name: "index"
    }
</script>

<style lang="scss" scoped>
  .order-container{
    background-color: #f0f2f5;
    padding: 32px;
  }
</style>
