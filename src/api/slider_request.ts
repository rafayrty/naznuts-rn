import axios from 'axios';
// axios.defaults.headers.common.Authorization = `Bearer ${
//   JSON.parse(res).jwt
// }`;

export default async function () {
  return await axios.get('http://localhost:1337/api/sliders?populate=image');
}
