export default {
  addCart(context, payload) {

    return new Promise((resolve, reject) => {

      let oldProduct = null
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      if (oldProduct) {
        //数量+1
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('购物车数量+1')
      }else {
        //数量=1
        // payload.count = 1
        context.commit('addToCart', payload)
        resolve('购物车添加成功')
        reject('11111')
      }
    })
  }
}
