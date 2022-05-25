import axios from 'axios';
import {API_URL} from '../../consts';

export default function (data: any) {
  return axios.post(`${API_URL}/api/auth/local/register`, data);
}
