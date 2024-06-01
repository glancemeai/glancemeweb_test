import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateShareState {
    ShareState: boolean,
    url:string
}

const initialStateShareState: initialStateShareState = {
    ShareState: false,
    url:"https://talentscrew.com"
};

//image preview
interface initialStatePreview {
    showState: boolean,
    url:string
    alt:string
}

const initialStatePreview: initialStatePreview = {
    showState: false,
    url:"/images/userbg.png",
    alt:"talentscrew"
};


interface PostImage {
    showState: boolean,
    url:any,
    imageObj:any
};

const PostImage:PostImage = {
    showState: false,
    url:"",
    imageObj:{}
};

// skills get
interface skill {
    skill_id: string | null,
    name: string | null
}
interface suggestionSkills {

    status_code: number,
    message: string | null,
    data: skill[]
        
}
const suggestionSkills: suggestionSkills = {
    status_code:0,
    message:"",
    data:[]
}

const UtilsSlice = createSlice({
    name: "utils",
    initialState: {
        PostImage:PostImage,
        initialStateShareState:initialStateShareState,
        suggestionSkills:suggestionSkills,
        initialStatePreview:initialStatePreview
    },
    reducers: {
        ShareCTR(state, action: PayloadAction<initialStateShareState>) {
            state.initialStateShareState = action.payload;
        },
        PreviewCall(state, action: PayloadAction<initialStatePreview>) {
            state.initialStatePreview = action.payload;
        },
        SetPostImage(state, action: PayloadAction<PostImage>) {
            state.PostImage = action.payload;
        },
        SuggestionSkillsCall(state, action: PayloadAction<suggestionSkills>) {
            state.suggestionSkills = action.payload;
        }
    }
})

export const { ShareCTR,PreviewCall,SetPostImage,SuggestionSkillsCall } = UtilsSlice.actions;
export default UtilsSlice.reducer;