<template>
    <div class="product-container">
      <el-card>
        <div class="list-query">
          <el-select size="small" v-model="listQuery.type" placeholder="请选择类型">
            <el-option v-for="(list,index) in typeList" :key="index" :label="list.label" :value="list.value"></el-option>
          </el-select>
          <el-input @keyup.13.native="getPagePrepaidCard" v-model="listQuery.sku" placeholder="sku" size="small" style="width: 180px"></el-input>
          <el-button @click="getPagePrepaidCard" size="small" type="primary">查询</el-button>
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
        <el-table size="small" :data="productList">
          <el-table-column label="产品名称" prop="title"></el-table-column>
          <el-table-column label="税前价" prop="beforeTaxPrice"></el-table-column>
          <el-table-column label="币种" prop="currency"></el-table-column>
          <el-table-column label="热卖" prop="beforeTaxPrice">
            <template slot-scope="scope">
              <span v-if="scope.row.isHot">是</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column label="type" prop="type"></el-table-column>
          <el-table-column label="location" prop="location"></el-table-column>
          <el-table-column label="sku" prop="sku"></el-table-column>
          <el-table-column width="100px" label="supplierSku" prop="supplierSku"></el-table-column>
          <el-table-column label="权重" prop="weight"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1"><el-tag>可用</el-tag></span>
              <span v-else><el-tag type="danger">不可用</el-tag></span>
            </template>
          </el-table-column>
          <el-table-column width="160" label="上架时间" prop="createdAt"></el-table-column>
          <el-table-column label="操作" prop="createdAt">
            <template slot-scope="scope">
              <el-button @click="viewProductDetails(scope.row.id)" size="mini" type="primary"><i class="el-icon-edit"></i></el-button>
              <!--<el-button size="mini" type="danger"><i class="el-icon-delete"></i></el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
  import {getPagePrepaidCard} from 'api/product'
  const typeList = [{
    label: '苹果',
    value: 'apple'
  }, {
    label: '安卓',
    value: 'android'
  }]
    export default {
      name: "index",
      data() {
        return {
          typeList: typeList,
          productList: [],
          pageNo: 1,
          pageSize: 10,
          total: null,
          listQuery: {
            sku: null,
            type: null
          }
        }
      },
      mounted() {
        this.getPagePrepaidCard()
      },
      methods: {
        handleSizeChange(size) {
          this.pageSize = size
          this.pageNo = 1
          this.getPagePrepaidCard()
        },
        handleCurrentChange(pageNo) {
          this.pageNo = pageNo
          this.getPagePrepaidCard()
        },
        viewProductDetails(id) {
          this.$router.push({
            path: '/product/createProduct',
            query: {
              id: id
            }
          })
        },
        getPagePrepaidCard() {
          getPagePrepaidCard(this.pageNo,this.pageSize,{
            sku: null,
            type: null
          }).then(response => {
            this.productList = response.data.result.list
            this.total = response.data.result.recordsTotal
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .product-container{
    background-color: #f0f2f5;
    padding: 32px;
    .list-query{
      margin-bottom: 20px;
    }
  }
</style>
