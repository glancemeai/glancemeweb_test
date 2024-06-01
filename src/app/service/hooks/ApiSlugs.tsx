import APIClient from "./connection";

export default function Apis() {
    const URL = "https://rotenx.me"

    const Login = async (data:any) => {
        var result = await APIClient("POST", `${URL}/user/login`, false, data);
        return result;
    }
    const Signup = async (data:any) => {
        var result = await APIClient("POST", `${URL}/user`, false, data);
        return result;
    }
    const AllNotes = async () => {
        var result = await APIClient("POST", `${URL}/notes/all-notes`, false, null);
        return result;
    }
    const UserDetails = async (data:string) => {
        var result = await APIClient("GET", `${URL}/user/${data}`, false, null);
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
        AllNotes,
        UserDetails,
        SingleNotes,
        EditNotes,
        DeleteNotes
    }
}
