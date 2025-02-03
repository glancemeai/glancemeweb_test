import APIClient from "./connection";

export default function Apis() {
    const URL = "https://glanceme.co.in/v1/api"

    const Login = async (data:any) => {
        var result = await APIClient("POST", `${URL}/users/login`, false, data);
        return result;
    }
    const Logout = async () => {
        var result = await APIClient("GET", `${URL}/users/logout`, false, null);
        return result;
    }
    
    const Signup = async (data:any) => {
        var result = await APIClient("POST", `${URL}/users/signup`, false, data);
        console.log(result);
        
        return result;
    }
    
    const Verify = async (data:any) => {
        var result = await APIClient("POST", `${URL}/users/verify`, false, data);
        return result;
    }

    const AllNotes = async (folderId?:string) => {
        var result = await APIClient("GET", `${URL}/notes/all-notes/${folderId ? folderId : ""}`, true, null);
        return result;
    }
    const UserDetails = async (data:string) => {
        var result = await APIClient("GET", `${URL}/users/${data}`, false, null);
        return result;
    }

    const SingleNotes = async (data:any) => {
        var result = await APIClient("POST", `${URL}/notes/single-notes`, false, data);
        return result;
    }

    const EditNotes = async (data:any) => {
        var result = await APIClient("PUT", `${URL}/notes/`, false, data);
        return result;
    }

    const DeleteNotes = async (data:any) => {
        var result = await APIClient("DELETE", `${URL}/notes/`, false, data);
        return result;
    }

    const DeleteAllNotes = async (data:any) => {
        var result = await APIClient("DELETE", `${URL}/notes/all`, false, data);
        return result;
    }

    const CreateFolder = async (data:any) => {
        var result = await APIClient("POST", `${URL}/folder/create`, false, data);
        return result;
    }

    const DeleteFolder = async (data:any) => {
        var result = await APIClient("DELETE", `${URL}/folder/`, false, data);
        return result;
    }

    const CreatePayment = async (data:any) => {
        var result = await APIClient("POST", `${URL}/payments/create-order`, false, data);
        return result;
    }

    const VerifyPayment = async (data:any) => {
        var result = await APIClient("POST", `${URL}/payments/verify-payment`, false, data);
        return result;
    }

    const GetPlans = async () => {
        var result = await APIClient("GET", `${URL}/plans`, false, null);
        return result;
    }

    const SearchNotes = async (data:any) => {
        var result = await APIClient("GET", `${URL}/notes/search?${data}`, false, null);
        return result;
    }

    const GetChat = async (data:any) => {
        var result = await APIClient("GET", `${URL}/chat?${data}`, false, null);
        return result;
    }
    

    
    // 
    return {
        Login,
        Logout,
        Signup,
        Verify,
        AllNotes,
        UserDetails,
        SingleNotes,
        EditNotes,
        DeleteNotes,
        DeleteAllNotes,
        CreateFolder,
        DeleteFolder,
        CreatePayment,
        VerifyPayment,
        GetPlans,
        SearchNotes,
        GetChat
    }
}
