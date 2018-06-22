// import uuid from 'uuid'
import Vue from 'vue'

import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types'

export function fetchProducts ({ commit }) {
  return Vue.http.get('products/')
    .then((response) => commit(FETCH_PRODUCTS, response.body.data))
}

export function createProduct ({ commit }, product) {
  return Vue.http.post('products', product)
    .then((response) => commit(CREATE_PRODUCT, response.body.data))
}

export function updateProduct ({ commit }, product) {
  return Vue.http.put(`products/${product.id}`, product)
    .then((response) => commit(UPDATE_PRODUCT, response.body.data))
}

export function saveProduct ({ commit, state }, product) {
  const index = state.all.findIndex((p) => p.id === product.id)

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    return updateProduct({ commit }, product)
    // commit(UPDATE_PRODUCT, product)
  } else {
    return createProduct({ commit }, product)
    // product.id = uuid.v4()
    // commit(CREATE_PRODUCT, product)
  }
}

export function deleteProduct ({ commit }, productId) {
  return Vue.http.delete(`products/${productId}`)
    .then((response) => commit(DELETE_PRODUCT, productId))
}
