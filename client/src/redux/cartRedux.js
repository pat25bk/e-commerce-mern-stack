import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += action.payload.price*action.payload.quantity;
        },
        modifyProduct:(state,action)=>{
            const {amount,productIdx} = action.payload;
            console.log(amount,productIdx);

            state.total += state.products[productIdx].price*amount;
            if (amount==-1){
                if(state.products[productIdx].quantity==1){
                    state.quantity -=1;
                    state.products.splice(productIdx,1);
                }else{
                    state.products[productIdx].quantity += amount;
                }
            }
            else{
                state.products[productIdx].quantity += amount;
            }
        },
        removeAllProduct:(state)=>{
            state.products = [];
            state.quantity=0;
            state.total=0;
        }
    }
})

export const {addProduct,modifyProduct,removeAllProduct}=cartSlice.actions;
export default cartSlice.reducer;