import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Folders from "../../components/utils/Interfaces/Folders";

interface FoldersState {
    allFolders: Folders[];
}

const initialState: FoldersState = {
    allFolders: []
};

const FoldersSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        setAllFolders: (state, action: PayloadAction<Folders[]>) => {
            state.allFolders = action.payload;
        },
        addFolder: (state, action: PayloadAction<Folders>) => {
            state.allFolders.push(action.payload);
        },
        removeFolder: (state, action: PayloadAction<string>) => {
            state.allFolders = state.allFolders.filter(
                folder => folder._id !== action.payload
            );
        }
    }
});

export const { 
    setAllFolders, 
    addFolder, 
    removeFolder 
} = FoldersSlice.actions;

export default FoldersSlice.reducer;
