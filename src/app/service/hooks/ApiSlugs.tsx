import APIClient from "./connection";
import Folders from '../../components/utils/Interfaces/Folders';

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
        try {
            var result = await APIClient("GET", `${URL}/notes/all-notes/${folderId ? folderId : ""}`, true, null);
            
            // Normalize the response
            if (result && result.status === 200) {
                return {
                    status: 200,
                    data: result.data || result || [],
                    message: result.message || 'Notes fetched successfully'
                };
            } else {
                return {
                    status: result?.status || 500,
                    data: [],
                    message: result?.message || 'Failed to fetch notes'
                };
            }
        } catch (error: any) {
            console.error('AllNotes API Error:', error);
            return {
                status: 500,
                data: [],
                message: error.message || 'An unexpected error occurred'
            };
        }
    }

    const UserDetails = async (data:string) => {
        var result = await APIClient("GET", `${URL}/users/${data}`, false, null);
        return result;
    }

    const SingleNotes = async (data:any) => {
        var result = await APIClient("POST", `${URL}/notes/single-notes`, false, data);
        return result;
    }

    const EditNotes = async (data: {
        notes_token?: string,
        folderId?: string,
        title?: string,
        description?: string,
        color?: string,
        reminder?: boolean,
        reminderDate?: string
    }) => {
        console.log('EditNotes API Call - Input:', data);
        // Changed to match the endpoint that works for note creation
        var result = await APIClient("PUT", `${URL}/notes/edit`, true, {
            notes_token: data.notes_token,
            folder_id: data.folderId,
            title: data.title,
            description: data.description,
            color: data.color,
            reminder: data.reminder,
            reminder_date: data.reminderDate
        });
        console.log('EditNotes API Call - Result:', result);
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
        try {
            var result = await APIClient("GET", `${URL}/notes/search?${data}`, true, null);
            
            // Normalize the response
            if (result && result.status === 200) {
                return {
                    status: 200,
                    data: result.data || result || [],
                    message: result.message || 'Notes searched successfully'
                };
            } else {
                return {
                    status: result?.status || 500,
                    data: [],
                    message: result?.message || 'Failed to search notes'
                };
            }
        } catch (error: any) {
            console.error('SearchNotes API Error:', error);
            return {
                status: 500,
                data: [],
                message: error.message || 'An unexpected error occurred'
            };
        }
    }

    const GetChat = async (data:any) => {
        var result = await APIClient("GET", `${URL}/chat?${data}`, false, null);
        return result;
    }

    const GetFolders = async () => {
        try {
            var result = await APIClient("GET", `${URL}/folder`, true, null);
            
            if (result && result.status === 200) {
                const folders = Array.isArray(result.data) ? result.data : [];
                
                // Create a map of all folders
                const folderMap = new Map();
                folders.forEach(folder => {
                    folderMap.set(folder._id, {
                        ...folder,
                        isRoot: true // Initially mark all as root
                    });
                });

                // Identify non-root folders
                folders.forEach(folder => {
                    if (folder.parentFolder) {
                        const parent = folderMap.get(folder.parentFolder);
                        if (parent) {
                            folderMap.get(folder._id).isRoot = false;
                        }
                    }
                });

                // Filter to only return root folders
                const rootFolders = folders.filter(folder => {
                    const folderData = folderMap.get(folder._id);
                    return folderData.isRoot;
                });

                return {
                    status: 200,
                    data: rootFolders,
                    message: result.message || 'Folders fetched successfully'
                };
            } else {
                return {
                    status: result?.status || 500,
                    data: [],
                    message: result?.message || 'Failed to fetch folders'
                };
            }
        } catch (error: any) {
            console.error('GetFolders API Error:', error);
            return {
                status: 500,
                data: [],
                message: error.message || 'An unexpected error occurred'
            };
        }
    };

    // Simple function to move a note to a folder
    const moveToFolder = async (folderId: string, noteToken: string) => {
        try {
            const requestBody = {
                "noteToken": noteToken,
                "parentId": folderId
            };

            const result = await APIClient("PUT", `${URL}/notes/move`, true, requestBody);
            return result;
        } catch (error: any) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    const moveFolderToFolder = async (folderId: string, parentId: string) => {
        try {
            const requestBody = {
                "folderId": folderId,
                "parentId": parentId
            };

            const result = await APIClient("PUT", `${URL}/folder`, true, requestBody);
            return result;
        } catch (error: any) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

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
        GetChat,
        GetFolders,
        moveToFolder,
        moveFolderToFolder
    }
}
