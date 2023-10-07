import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name:"reminder",
    initialState:{
        reminderData:[]
    },
    reducers :{
        setReminderData :(state,action) => {
          state.reminderData = action.payload.reminderData
        },
        addReminderData :(state,action) => {
            const reminder = action.payload.reminderData;
            state.reminderData.push(reminder);
        }
    }
});

export const reminderReducer = reminderSlice.reducer;
export const { setReminderData,addReminderData } = reminderSlice.actions;