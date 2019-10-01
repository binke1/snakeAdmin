<template>
    <div class="user-container">
      <el-card>
        <div class="list-query">
          <el-input clearable class="filter-item" style="width: 120px" v-model="listQuery.userName"  size="small" placeholder="userName"></el-input>
          <el-input clearable class="filter-item" style="width: 120px" v-model="listQuery.firstName" size="small" placeholder="firstName"></el-input>
          <el-input clearable class="filter-item" style="width: 120px" v-model="listQuery.lastName" size="small" placeholder="lastName"></el-input>
          <el-input clearable class="filter-item" style="width: 120px" v-model="listQuery.mobile" size="small" placeholder="Phone"></el-input>
          <el-input clearable class="filter-item" style="width: 120px" v-model="listQuery.email" size="small" placeholder="Email"></el-input>
          <el-button size="small" @click="handleFilter" type="primary">查询</el-button>
          <el-button size="small" @click="handleAddClient" type="primary"><i class="el-icon-plus"></i> 新增管理员</el-button>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <el-table :data="tableData" size="small">
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="firstName" label="姓氏"></el-table-column>
          <el-table-column prop="lastName" label="名字"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="createAt" label="创建时间"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="!scope.row.status === 2">可用</span>
              <span v-else>不可用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row.id)" type="warning" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
  import moment from 'moment'
  import {getClientPage, activeClient} from '@/api/user'
    export default {
      name: "index",
      data() {
        return {
          listQuery: {
            userName: null,
            firstName: null,
            lastName: null,
            mobile:null,
            email:null,
          },
          pageNo: 1,
          pageSize: 10,
          total: 0,
          tableData: []
        }
      },
      mounted() {
        this.handleFilter()
      },
      methods: {
        editUser(id) {
          this.$router.push({
            path: '/user/userForm',
            query: {
              id: id
            }
          })
        },
        handleSizeChange(size) {
          this.pageSize = size
          this.pageNo = 1
          this.handleFilter()
        },
        handleCurrentChange(pageNo) {
          this.pageNo = pageNo
          this.handleFilter()
        },
        getTableData(listQuery, pageNo, pageSize) {
          var clientList = []
          getClientPage(listQuery, pageNo, pageSize).then(response => {
            console.log(response)
            for (let i = 0; i < response.data.result.list.length; i++) {

              var obj = {}
              obj.userName = response.data.result.list[i].userName
              obj.firstName = response.data.result.list[i].firstName
              obj.lastName = response.data.result.list[i].lastName
              obj.uuid = response.data.result.list[i].uuid
              obj.phone = response.data.result.list[i].phone
              obj.mobile = response.data.result.list[i].mobile
              obj.email = response.data.result.list[i].email
              obj.status = response.data.result.list[i].status
              obj.id = response.data.result.list[i].id

              obj.createdAt = moment(response.data.result.list[i].createdAt).format("YYYY-MM-DD HH:mm:ss")
              if(response.data.result.list[i].userPaymentOption != null && response.data.result.list[i].userPaymentOption != 'undefined'){
                obj.restrictedWithdrawal = response.data.result.list[i].userPaymentOption.restrictedWithdrawal
              }else {
                obj.restrictedWithdrawal = true
              }
              clientList[i] = obj
            }
            this.total = response.data.result.recordsTotal;
            this.tableData = clientList
          })
        },
        handleFilter() {
          this.getTableData(this.listQuery, 1, this.pageSize)
        },
        handleAddClient() {
          this.$router.push({
            path: '/user/userForm'
          })
        },
      }
    }
</script>

<style lang="scss" scoped>
  .user-container{
    background-color: rgb(240,242,245);
    padding: 32px;
    .list-query{
      margin-bottom: 15px;
    }
  }
</style>
