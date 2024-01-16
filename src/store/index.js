import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../pages/profile/userSlice'
import catReducer from '../pages/category/categorySlice'
export default configureStore({
    reducer: {
        userInfo: adminReducer,
        catInfo: catReducer
    }
})