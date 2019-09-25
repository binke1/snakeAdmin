<template>
    <div class="product-container">
      <el-card>
        <el-table size="small">
          <el-table-column label="产品名称"></el-table-column>
          <el-table-column label="规格"></el-table-column>
          <el-table-column label="价格"></el-table-column>
          <el-table-column label="库存"></el-table-column>
          <el-table-column label="权重"></el-table-column>
          <el-table-column label="上架时间"></el-table-column>
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
  .product-container{
    background-color: #f0f2f5;
    padding: 32px;
  }
</style>
