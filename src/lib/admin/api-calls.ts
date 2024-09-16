import { authenticatedApiCall } from '@/lib/api-call-function';

// #################################### Customers APIs ####################################
export async function fetchCustomers(page = 1, limit = 10) {
    const response = await authenticatedApiCall(`/users?page=${page}&limit=${limit}`, "GET");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return { users: [], total: 0 }; // Handle the error as needed
    }
    return {
        users: response.data.results,
        total: response.data.totalResults, // Total number of products
        totalPages: response.data.totalPages // Total number of pages
    };
}

// #################################### Sellers APIs ####################################
export async function fetchSellers(page = 1, limit = 10) {
      // Make the API call to fetch sellers
        const response = await authenticatedApiCall(`/seller?page=${page}&limit=${limit}`, "GET");
         console.log(response)
        if (response.error || !(response.data) || !(response.data.sellers)) {
            console.error(response.error);
            return { sellers: [], total: 0 }; // Handle the error as needed
        }
        return {
            sellers: response.data.sellers,
            total: response.data.totalResults, // Total number of products
            totalPages: response.data.totalPages // Total number of pages
        };
    }
export async function approveSeller(sellerId: String) {
    const response = await authenticatedApiCall(`/seller/${sellerId}/approve`, "PATCH");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}
export async function disapproveSeller(selectedSeller: string, message: string) {
    const response = await authenticatedApiCall(`/seller/${selectedSeller}/disapprove`, "PATCH", "application/json", {message});
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;

}

// #################################### Category APIs ####################################
export async function fetchCategories(page = 1, limit = 10) {
    const response = await authenticatedApiCall(`/category?page=${page}&limit=${limit}`, "GET");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return { categories: [], total: 0 }; // Handle the error as needed
    }
    return {
        categories: response.data.results,
        total: response.data.totalResults, // Total number of products
        totalPages: response.data.totalPages // Total number of pages
    }
}
export async function addCategory(name: string) {
    const response = await authenticatedApiCall(`/category`, "POST", "application/json", {name});
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}
export async function updateCategory(categoryId: string, name: string) {
    const response = await authenticatedApiCall(`/category/${categoryId}`, "PATCH", "application/json", {name});
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}
export async function changeStatusCategory(categoryId: string) {
    const response = await authenticatedApiCall(`/category/${categoryId}/status`, "PATCH", "application/json");
    console.log(response);
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}


// #################################### Count APIs ####################################

export async function fetchAdminCount() {
    const response = await authenticatedApiCall("/users/count", "GET");
    if (response.error || !(response.data)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}

// #################################### Product APIs ####################################

export async function fetchProducts(page = 1, limit = 10) {
    const response = await authenticatedApiCall(`/product?page=${page}&limit=${limit}`, "GET");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return { products: [], total: 0 }; // Handle the error as needed
    }
    return {
        products: response.data.results,
        total: response.data.totalResults, // Total number of products
        totalPages: response.data.totalPages // Total number of pages
    };
}