import axios from 'axios';
// axios.defaults.headers.common.Authorization = `Bearer ${
//   JSON.parse(res).jwt
// }`;

export async function categories_request() {
  return await axios.get('http://localhost:1337/api/categories?populate=icon');
}

export async function categories_product_request({queryKey}: any) {
  return await axios.get(
    `http://localhost:1337/api/products?filters[categories][slug][$eq]=${queryKey[1]}&populate=*`,
  );
}
