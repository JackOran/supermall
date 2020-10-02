export default {
  addCounter(state, payload) {
    payload.count += 1
  },
  addToCart(state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  }
}
