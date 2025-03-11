import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            console.log("index",index)
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        setAllTasks:  (state, action)=>{
            console.log("action.payload",action.payload)
            state.tasks = [...action.payload]
        }
    },
});

export const { addTask, removeTask, updateTask,setAllTasks } = taskSlice.actions;

export default taskSlice.reducer;