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



export async function approveSeller(sellerId: ObjectId, isApproved: boolean) {
    const url = `/seller/${sellerId}/approve`;

    const response = await authenticatedApiCall(url, "PATCH", {
        isApproved: !isApproved, // Toggle the approval status
    });

    if (response.error) {
        console.error(response.error);
        return null; // Handle error as needed
    }

    return response.data;
}




// export async function delteSellers(querry) {
//     const sellerResponse = await authenticatedApiCall("/seller", "DELTE", "application/json", querry);

//     if (sellerResponse.error && !(sellerResponse.data) && !(sellerResponse.data.results)) {
//         console.error(sellerResponse.error);
//         return []; // or handle the error as needed
//     }
//     return sellerResponse.data;
// }
