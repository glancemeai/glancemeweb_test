import APIClient from "./connection";

export default function Apis() {
    const URL = "http://localhost:8000/v1/api"

    const Login = async (data:any) => {
        var result = await APIClient("POST", `${URL}/users/login`, false, data);
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

    const AllNotes = async () => {
        var result = await APIClient("GET", `${URL}/notes/all-notes`, true, null);
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
    // 
    return {
        Login,
        Signup,
        Verify,
        AllNotes,
        UserDetails,
        SingleNotes,
        EditNotes,
        DeleteNotes
    }
}
