import axios from 'axios';
import {API_URL} from '../../consts';

export default function (data: any) {
  let newData = {data: data};
  return axios.post(`${API_URL}/api/orders`, newData);
}
