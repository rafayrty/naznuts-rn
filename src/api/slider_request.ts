import axios from 'axios';
import {API_URL} from '../../consts';
// axios.defaults.headers.common.Authorization = `Bearer ${
//   JSON.parse(res).jwt
// }`;

export default async function () {
  return await axios.get(`${API_URL}/api/sliders?populate=image`);
}
