import axios from 'axios';
import {API_URL} from '../../consts';

export default function (data: any) {
  // console.log('any', data);
  return axios.post(`${API_URL}/api/auth/local`, {
    identifier: data.email,
    password: data.password,
  });
}
