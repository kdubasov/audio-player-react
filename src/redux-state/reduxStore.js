import {configureStore} from "@reduxjs/toolkit";
import linkSlice from "./slices/linkSlice.js";

export const reduxStore = configureStore({
    reducer : {
        linkSlice:linkSlice,
    },
});
