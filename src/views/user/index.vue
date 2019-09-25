<template>
    <div class="user-container">
      <el-card>
        <el-table size="small">
          <el-table-column label="用户名"></el-table-column>
          <el-table-column label="姓氏"></el-table-column>
          <el-table-column label="名字"></el-table-column>
          <el-table-column label="电话"></el-table-column>
          <el-table-column label="邮箱"></el-table-column>
          <el-table-column label="创建时间"></el-table-column>
          <el-table-column label="状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="warning" size="small">编辑</el-button>
            </template>
          </el-table-column>
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
  .user-container{
    background-color: rgb(240,242,245);
    padding: 32px;
  }
</style>
