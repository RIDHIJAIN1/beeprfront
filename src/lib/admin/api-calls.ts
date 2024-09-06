import { authenticatedApiCall } from '@/lib/api-call-function';

export async function fetchCustomers() {
    const customersResponse = await authenticatedApiCall("/users", "GET");

    if (customersResponse.error && !(customersResponse.data) && !(customersResponse.data.results)) {
        console.error(customersResponse.error);
        return []; // or handle the error as needed
    }

    return customersResponse.data.results;
}
export async function fetchSellers() {
    const sellerResponse = await authenticatedApiCall("/seller", "GET");

    if (sellerResponse.error && !(sellerResponse.data) && !(sellerResponse.data.results)) {
        console.error(sellerResponse.error);
        return []; // or handle the error as needed
    }
    return sellerResponse.data;
}

export async function approveSellers(sellerId: String) {
    const sellerResponse = await authenticatedApiCall(`/seller/${sellerId}/approve`, "PATCH");
    if (sellerResponse.error && !(sellerResponse.data) && !(sellerResponse.data.results)) {
        console.error(sellerResponse.error);
        return []; // or handle the error as needed
    }
    return sellerResponse.data;
}

export async function disapproveSellers(selectedSeller: string, message: string) {
    const sellerResponse = await authenticatedApiCall(`/seller/${selectedSeller}/disapprove`, "PATCH", "application/json", {message});
    if (sellerResponse.error && !(sellerResponse.data) && !(sellerResponse.data.results)) {
        console.error(sellerResponse.error);
        return []; // or handle the error as needed
    }
    return sellerResponse.data;
}


