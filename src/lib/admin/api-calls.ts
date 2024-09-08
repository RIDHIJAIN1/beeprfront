import { authenticatedApiCall } from '@/lib/api-call-function';

// #################################### Customers APIs ####################################
export async function fetchCustomers() {
    const response = await authenticatedApiCall("/users", "GET");

    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }

    return response.data.results;
}

// #################################### Sellers APIs ####################################
export async function fetchSellers() {
    const response = await authenticatedApiCall("/seller", "GET");
    if (response.error || !(response.data)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
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



// #################################### Category APIs ####################################
export async function fetchCategories() {
    const response = await authenticatedApiCall("/category", "GET");
    if (response.error || !(response.data)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
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

export async function fetchProducts() {
    const response = await authenticatedApiCall("/product", "GET");

    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }

    return response.data.results;
}