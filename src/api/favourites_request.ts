import axios from 'axios';
export default async function favourites_request(data: any) {
  // console.log(data.queryKey[1]);
  if (data.queryKey[1] !== undefined) {
    return await axios.get(
      `http://localhost:1337/api/favourites?filters[users_permissions_user][id][$eq]=${data.queryKey[1].user.id}&populate=*,product.image,product.categories`,
    );
  }
}
