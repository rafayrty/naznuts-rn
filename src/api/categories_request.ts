import axios from 'axios';
import {API_URL} from '../../consts';

// axios.defaults.headers.common.Authorization = `Bearer ${
//   JSON.parse(res).jwt
// }`;

//Running Tests On Filters

export async function categories_request() {
  return await axios.get(`${API_URL}/api/categories?populate=icon`);
}

export async function categories_product_home_request({queryKey}: any) {
  return await axios.get(
    `${API_URL}/api/products?filters[categories][slug][$eq]=${queryKey[1]}&populate=*`,
  );
}

export async function categories_product_request({queryKey}: any) {
  if (queryKey[1][1].length > 1) {
    let url = `${API_URL}/api/products?filters[$and][0][categories][slug][$eq]=${queryKey[1][0]}&filters[$and][1][price][$between][0]=${queryKey[1][1][0].from}&filters[$and][1][price][$between][1]=${queryKey[1][1][0].to}`;

    if (queryKey[1][1][1].length > 0) {
      let tags = queryKey[1][1][1];
      tags.forEach((tag: number, index: number) => {
        url += `&filters[$and][${
          index + tags.length + 1
        }][tags][id][$in]=${tag}`;
      });
    }

    url += `&sort[0]=price%3A${queryKey[1][1][2]}&populate=*`;
    return await axios.get(url);
  }
  return await axios.get(
    `${API_URL}/api/products?filters[categories][slug][$eq]=${queryKey[1][0]}&populate=*`,
  );
}

// ?filters[price][$between][0]=0&filters[price][$between][1]=10

//https://1ce7-111-68-99-197.in.ngrok.io/api/products?filters[$and][0][categories][id][$eq]=1&filters[$and][1][price][$between][0]=0&filters[$and][1][price][$between][1]=10

//https://1ce7-111-68-99-197.in.ngrok.io/api/products?filters[$and][0][categories][id][$eq]=1&filters[$and][1][price][$between][0]=0&filters[$and][1][price][$between][1]=10&filters[$and][2][tags][id][$eq]=1
