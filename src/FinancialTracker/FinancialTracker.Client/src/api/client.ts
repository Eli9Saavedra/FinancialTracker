const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * export - makes it avaiable to other files
 * async - it will use await inside 
 * <T> - a placeholder for "whatever type the caller wants back"
 * path - the endpoint path e.g. 'api/categories'
 * options? - optional settings like HTTP method, body, headers
 * Promise<T> - it returns a promise that resolves to type T
 * @param path
 * @param options
 */
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {

    // Combines the URL + path -> http://localhost:5228/api/categories
    const response = await fetch(BASE_URL + path, options);

    if (!response.ok) {
        const text = await response.text();
        const message = text || `Request failed (${response.status})`;
        throw new Error(message);
    }

    return response.json();
}