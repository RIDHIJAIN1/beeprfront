const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function authenticatedApiCall(route: string, method: string, contentType: string = "application/json", queryParams: Record<string, any> = null, bodyParams: Record<string, any> = null): Promise<{ data: any; error?: string }> {
    const token = localStorage.getItem('auth-access-token');
    if (!token) return { data: null, error: "Auth token unavailable" };

    // Construct query string from queryParams
    const queryString = queryParams ? '?' + new URLSearchParams(queryParams).toString() : '';
    const response = await fetch(`${BACKEND_URL}${route}${queryString}`, {
        method: method,
        headers: {
            'Content-Type': contentType,
            'Authorization': `Bearer ${token}`,
        },
        body: bodyParams ? JSON.stringify(bodyParams) : null,
    });

    if (!response.ok) {
        return { data: null, error: `Error: ${response.statusText}` };
    }

    const data = await response.json();
    return { data };
}