import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../pages/profile/userSlice'
import catReducer from '../pages/category/categorySlice'
import productReducer from '../pages/product/productSlice'
import orderReducer from '../pages/order/orderSlice'
export default configureStore({
    reducer: {
        userInfo: adminReducer,
        catInfo: catReducer,
        productInfo: productReducer,
        orderInfo: orderReducer,
    }
})