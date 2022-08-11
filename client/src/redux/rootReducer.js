const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "updateCart":
      //console.log(state.cartItems);

      //const newCart = [...state.cartItems];

      const newCart = state.cartItems.map( item => {

        if(item.item._id == action.payload._id){
            return { ...item, quantity: action.payload.quantity};
        }
        else{
            return item;
        }
      })

      //console.log(newCart);

      return {
        ...state,
        cartItems: newCart,
      };
    case "deleteFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => action.payload._id !== item.item._id
        ),
      };
    case "showLoading" : return {
        ...state,
        loading: true
    }
    case "hideLoading" : return {
        ...state,
        loading: false
    }
    default:
      return state;
  }
};
