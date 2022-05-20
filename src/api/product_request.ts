import axios from 'axios';

export async function product_request({queryKey}: any) {
  return await axios.get(
    `http://localhost:1337/api/products?filters[slug][$eq]=${queryKey[1]}&populate=favourite.product,favourite.users_permissions_user,categories,tags,image`,
  );
}
