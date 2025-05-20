import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
    name: 'email',
    initialState: {
        value: 'User Email'
    },
    reducers: {
        updateEmail: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateEmail } = emailSlice.actions;
export default emailSlice.reducer;
