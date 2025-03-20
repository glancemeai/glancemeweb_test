const APIClient = async (method: string,
    url: string,
    token: boolean | null = null,
    request: any = null) => {
    let isFormData = request instanceof FormData;

    // Get token from localStorage with SSR check
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Prepare headers
    const headers = new Headers();
    headers.append("Accept", "application/json");
    
    // Don't set Content-Type for FormData
    if (!isFormData) {
        headers.append("Content-Type", "application/json");
    }

    // Always add token if it exists
    if (storedToken) {
        headers.append("Authorization", `Bearer ${storedToken}`);
    }

    // Prepare request options
    const options: RequestInit = {
        method: method,
        headers: headers,
        credentials: 'include',
    };

    // Add body if request data exists
    if (request !== null) {
        if (isFormData) {
            options.body = request;
        } else {
            options.body = JSON.stringify(request);
        }
    }

    try {
        console.log('API Request:', {
            method,
            url,
            headers: Object.fromEntries(headers.entries()),
            body: options.body
        });

        const response = await fetch(url, options);
        console.log('API Response Status:', response.status);
        console.log('Current token:', localStorage.getItem('token'));
        
        const responseText = await response.text();
        console.log('API Response Text:', responseText);

        // Try to parse JSON only if we have content
        let data = null;
        if (responseText.trim()) {
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                return {
                    status: response.status,
                    data: null,
                    message: response.status === 404 ? 'API endpoint not found' : 'Invalid server response'
                };
            }
        }

        // For 200 responses, return success with data
        if (response.ok) {
            return {
                status: response.status,
                data: data?.data || data,
                message: data?.message || 'Success'
            };
        }

        // For error responses, try to extract error message
        let errorMessage = data?.message || `Server error: ${response.status}`;
        if (data?.error) {
            errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
        }

        return {
            status: response.status,
            data: data,
            message: errorMessage
        };

    } catch (error) {
        console.error('API Error:', error);
        
        let errorMessage = 'Network error';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && 
                   typeof error === 'object' && 
                   'message' in error && 
                   typeof (error as { message: unknown }).message === 'string') {
            errorMessage = (error as { message: string }).message;
        }

        return {
            status: 500,
            data: null,
            message: errorMessage
        };
    }
};

export default APIClient