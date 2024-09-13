export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  role?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  paymentOption?: string;
  isApproved?: string;
  photoId?: string;
  cannabisLicense?: string;
  resellersPermit?: string;

  [key: string]: unknown;
}
