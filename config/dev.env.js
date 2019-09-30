'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://sgcstaging.cn-northwest-1.eb.amazonaws.com.cn/admin/"'
})
