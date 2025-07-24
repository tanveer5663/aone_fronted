const baseUrl = "http://localhost:5082/api/";
const apiEndpoints = {
  login: `${baseUrl}user/login`,
  signup: `${baseUrl}user/register`,
  profile: `${baseUrl}user/profile`,
  cartCount: `${baseUrl}cart/count/`,
  logout: `${baseUrl}user/logout`,
  cartFetch: `${baseUrl}cart`,
  cartAdd: `${baseUrl}cart`,
  cartDelete: `${baseUrl}cart/`,
  cartUpdate: `${baseUrl}cart/`,
  productById: `${baseUrl}product/`,
  addAddress: `${baseUrl}user/address`,
  getAddress: `${baseUrl}user/getAddress/`,
  placedOrder: `${baseUrl}order`,
  getOrder: `${baseUrl}order/`,
  deleteCart: `${baseUrl}cart/deleteall/`,
  fetAllProducts: `${baseUrl}product/fetch/`,
  // Add more endpoints as needed
};

export default apiEndpoints;
