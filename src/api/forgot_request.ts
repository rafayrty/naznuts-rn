import axios from 'axios';
import {API_URL} from '../../consts';

export async function forgot_request(data: any) {
  return await axios.post(`${API_URL}/api/auth/forgot-password`, data);
}

export async function reset_request(data: any) {
  return await axios.post(`${API_URL}/api/auth/reset-password`, data);
}
