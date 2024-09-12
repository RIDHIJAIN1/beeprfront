import { authenticatedApiCall } from '@/lib/api-call-function'; 

export async function CreateSellerProfile() {
    const response = await authenticatedApiCall("/seller", "POST");

    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }

    return response.data.results;
}
export async function getProductsById(sellerId: string) {
    const response = await authenticatedApiCall(`/product?sellerId=${sellerId}`, "GET");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data.results;
}

export async function updateProduct(productId: string) {
    const response = await authenticatedApiCall(`/product/${productId}`, "PATCH", "application/json");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}


export async function deleteProduct(productId: string) {
    const response = await authenticatedApiCall(`/product/${productId}`, "DELETE");
    if (response.error || !(response.data) || !(response.data.results)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}


export async function ProductCountBySeller(sellerId: string) {
    const response = await authenticatedApiCall(`/seller/products/count/${sellerId}`, "GET");
    console.log(response);
    if (response.error || !(response.data)) {
        console.error(response.error);
        return []; // or handle the error as needed
    }
    return response.data;
}

// export async function DisapproveSeller(sellerId: string) {
//     const response = await authenticatedApiCall(`/seller/${sellerId}/disapprove`, "POST");
//     console.log(response);
//     if (response.error || !(response.data)) {
//         console.error(response.error);
//         return []; // or handle the error as needed
//     }
//     return response.data;
// }


