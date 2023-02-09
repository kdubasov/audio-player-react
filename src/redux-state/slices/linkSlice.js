import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    link: null,
}

export const linkSlice = createSlice({
    name:'linkSlice',
    initialState,
    reducers:{
        setLink:(state,action) => {
            state.link = action.payload;
        },
        clearLink:state => {
            state.link = null;
        }
    },
})

export const {setLink,clearLink} = linkSlice.actions;
export default linkSlice.reducer;
