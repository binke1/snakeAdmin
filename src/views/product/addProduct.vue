<template>
    <div class="add-product-container">
        <el-card>
          <el-form label-position="left" label-width="120px" :model="productData">
            <el-form-item label="产品名称">
              <el-input size="small" style="width: 800px" v-model="productData.title"></el-input>
            </el-form-item>
            <el-form-item label="产品摘要">
              <el-input size="small" style="width: 800px" v-model="productData.summary"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
              <el-input size="small" style="width: 800px" v-model="productData.description"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="productData.type">
                <el-radio label="apple">苹果</el-radio>
                <el-radio label="android">安卓</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="sku">
              <el-input size="small" style="width: 240px" v-model="productData.sku"></el-input>
            </el-form-item>
            <el-form-item label="供应商sku">
              <el-input size="small" style="width: 240px" v-model="productData.supplierSku"></el-input>
            </el-form-item>
            <el-form-item label="是否热卖">
              <el-radio-group v-model="productData.hasHot">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="币种">
              <el-radio-group v-model="productData.currency">
                <el-radio label="CAD">加币</el-radio>
                <el-radio label="USD">人民币</el-radio>
                <el-radio label="CNY">美元</el-radio>
              </el-radio-group>            </el-form-item>
            <el-form-item label="税前价格">
              <el-input size="small" style="width: 240px" v-model="productData.beforeTaxPrice"></el-input>
            </el-form-item>
            <el-form-item label="是否含税">
              <el-radio-group v-model="productData.hasTax">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="GST">
              <el-input-number v-model="productData.gstRate" size="small"></el-input-number>
            </el-form-item>
            <el-form-item label="PST">
              <el-input-number v-model="productData.pstRate" size="small"></el-input-number>
            </el-form-item>
            <el-form-item label="位置">
              <el-input size="small" style="width: 240px" v-model="productData.location"></el-input>
            </el-form-item>
            <el-form-item label="权重">
              <el-input size="small" style="width: 240px" v-model="productData.weight"></el-input>
            </el-form-item>
            <el-form-item label="产品状态">
              <el-radio-group v-model="productData.status">
                <el-radio :label="1">可用</el-radio>
                <el-radio :label="0">不可用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary">保存</el-button>
              <el-button @click="resetProductData" size="small" type="warning">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
    </div>
</template>

<script>
  import {createProduct} from 'api/product'
    export default {
      name: "addProduct",
      data() {
        return {
          productData: {
            type: 'apple',
            sku: null,
            supplierSku: null,
            title: null,
            summary: null,
            description: null,
            beforeTaxPrice: null,
            pstRate: 0,
            gstRate: 0,
            hasTax: true,
            hasHot: true,
            hasPromotion: false,
            weight: 0,
            currency: 'CAD',
            location: null,
            lcid: 2052,
            status: 1
          }
        }
      },
      methods: {
        resetProductData() {
          this.$confirm('是否清空数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(_ => {
            this.productData = {
              type: 'apple',
              sku: null,
              supplierSku: null,
              title: null,
              summary: null,
              description: null,
              beforeTaxPrice: null,
              pstRate: 0,
              gstRate: 0,
              hasTax: true,
              hasHot: true,
              hasPromotion: false,
              weight: 0,
              currency: 'CAD',
              location: null,
              lcid: 2052,
              status: 1
            }
          }).catch((_ => {}))
        }
      }
    }
</script>

<style lang="scss" scoped>
  .add-product-container{
    background-color: #f0f2f5;
    padding: 32px;
  }
</style>
