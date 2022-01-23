const initial = {
    allcart: []

}
export default (state = initial, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                allcart: action.payload[0].cart
            }
        case "CART_DEL": {
            return {
                allcart: []
            }
        }

        default: return state
    }
}