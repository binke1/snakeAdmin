<template>
    <div class="add-product-container">
        <el-card>
          <el-form label-position="left" label-width="120px" :model="formLabelAlign">
            <el-form-item label="产品名称">
              <el-input size="small" style="width: 800px" v-model="productData.title"></el-input>
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
            pstRate: null,
            gstRate: null,
            hasTax: true,
            hasIncludeTax: false,
            hasHot: true,
            hasPromotion: false,
            weight: 0,
            currency: 'CAD',
            location: 'Canada',
            lcid: 2052,
            status: 1
          }
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
