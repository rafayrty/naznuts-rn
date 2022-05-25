import axios from 'axios';
import {API_URL} from '../../consts';

export default async function (data: any) {
  return await axios.post(`${API_URL}/api/contacts`, {data: data});
}
