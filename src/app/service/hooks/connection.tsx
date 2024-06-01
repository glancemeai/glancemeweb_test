

const APIClient = async (method: string,
    url: string,
    token: boolean | null = null,
    request: any = null) => {
    let isFormData = request instanceof FormData;
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
   
    var options: any = {
        method: method,
        withCredentials: true,
        credentials: 'include' as RequestCredentials,
        headers: headers,
        timeout: 10000,
    };
    
    if (request !== null && !isFormData) {
        options = { ...options, body: JSON.stringify(request) };
    }
    else if (request !== null && isFormData) {
        options = { ...options, body: request };
    }

    let Fetchdata: any = await fetch(url, options)
    
    let data = await Fetchdata.json()
    return data;
}

export default APIClient