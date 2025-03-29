import APIClient from "./connection";
import Folders from '../../components/utils/Interfaces/Folders';

export default function Apis() {
    const URL = "https://glanceme.co.in/v1/api"
    const NEW_URL = "https://glanceme.co.in/v2/api"

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
        color?: string,
        description?: string,
        title?: string,
        folderId?: string,
        reminder?: boolean,
        reminderDate?: string
    }) => {
        console.log('EditNotes API Call - Input:', data);
        var result = await APIClient("PUT", `${URL}/notes`, true, {
            notes_token: data.notes_token,
            color: data.color,
            description: data.description,
            title: data.title,
            folder_id: data.folderId,
            reminder: data.reminder,
            reminder_date: data.reminderDate
        });
        console.log('EditNotes API Call - Result:', result);
        return result;
    }

    const EditFolder = async (data: {
        name: string,
        folderId: string
    }) => {
        try {
            const result = await APIClient("PUT", `${URL}/folder/detail`, true, {
                name: data.name,
                folderId: data.folderId
            });
            
            if (result && result.status === 200) {
                return {
                    status: 200,
                    data: result.data || {},
                    message: result.message || 'Folder updated successfully'
                };
            } else {
                return {
                    status: result?.status || 500,
                    data: {},
                    message: result?.message || 'Failed to update folder'
                };
            }
        } catch (error: any) {
            console.error('EditFolder API Error:', error);
            return {
                status: 500,
                data: {},
                message: error.message || 'An unexpected error occurred'
            };
        }
    }

    const SendChatMessage = async (data: {
        video_url?: string,
        video_time?: number,
        question: string,
        video_details?: string,
        tone?: string,
        language?: string,
        response_type?: string,
        model?: string,
    }) => {
        try {
            const requestBody = {
                video_url: data.video_url || "9696200225cbb13630c8fb08115e8b45",
                video_time: data.video_time || 3245,        
                question: data.question,                  
                video_details: data.video_details || "AI Research Paper on LLMs",
                tone: data.tone || "Professional",
                language: data.language || "English",
                response_type: data.response_type || "Concise", 
                model: data.model || "llama-3.1-8b-instant",
            };
            
            console.log("Sending data to API:", requestBody);
            
            const result = await APIClient(
                "POST", 
                `${NEW_URL}/websitequestion`, 
                true, 
                requestBody
            );
            
            if (result && result.status === 200) {
                return {
                    status: 200,
                    data: result.data || {},
                    message: result.message || 'Message sent successfully'
                };
            } else {
                return {
                    status: result?.status || 500,
                    data: {},
                    message: result?.message || 'Failed to send message'
                };
            }
        } catch (error: any) {
            console.error('SendChatMessage API Error:', error);
            return {
                status: 500,
                data: {},
                message: error.message || 'An unexpected error occurred'
            };
        }
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

    const CreateDonation = async (data:any) => {
        var result = await APIClient("POST", `${URL}/donate/create`, false, data);
        return result;
    }

    const VerifyDonation = async (data:any) => {
        var result = await APIClient("POST", `${URL}/donate/verify`, false, data);
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
                const folders: Folders[] = Array.isArray(result.data) ? result.data : [];
    
                const folderMap = new Map<string, Folders & { children: Folders[] }>();
                folders.forEach(folder => {
                    folderMap.set(folder._id, {
                        ...folder,
                        children: [] // Initialize children array
                    });
                });

                const rootFolders: (Folders & { children: Folders[] })[] = [];
                
                folders.forEach(folder => {
                    if (!folder.parentFolder) {
                        rootFolders.push(folderMap.get(folder._id)!);
                    } else {
                        const parent = folderMap.get(folder.parentFolder);
                        if (parent) {
                            parent.children.push(folderMap.get(folder._id)!);
                        } else {
                            rootFolders.push(folderMap.get(folder._id)!);
                        }
                    }
                });

                // Debug logging
                console.log('Processed Folders:', {
                    totalFolders: folders.length,
                    rootFolders: rootFolders.length,
                    rootFolderDetails: rootFolders.map(f => ({
                        id: f._id,
                        name: f.name,
                        childrenCount: f.children.length
                    }))
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

    const ContactUs = async (data: any) => {
        try {
            const result = await APIClient("POST", `${URL}/contactus`, true, data);
            
            // Normalize the response
            if (result && result.status === 200) {
                return {
                    status: 200,
                    data: result.data || {},
                    message: result.message || 'Message sent successfully'
                };
            } else {
                return {
                    status: result?.status || 500,
                    data: {},
                    message: result?.message || 'Failed to send message'
                };
            }
        } catch (error: any) {
            console.error('ContactUs API Error:', error);
            return {
                status: 500,
                data: {},
                message: error.message || 'An unexpected error occurred'
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
        moveFolderToFolder,
        ContactUs,
        SendChatMessage,
        EditFolder,
        CreateDonation,
        VerifyDonation
    }
}
