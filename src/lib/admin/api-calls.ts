import { authenticatedApiCall } from '@/lib/api-call-function';

export async function fetchCustomers() {
    const customersResponse = await authenticatedApiCall("/users", "GET");

    if (customersResponse.error && !(customersResponse.data) && !(customersResponse.data.results)) {
        console.error(customersResponse.error);
        return []; // or handle the error as needed
    }

    return customersResponse.data.results;
}