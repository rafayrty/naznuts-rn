import axios from 'axios';
import {API_URL} from '../../consts';

export async function user_update(data: any) {
  return await axios.put(`${API_URL}/api/users/${data.id}`, {
    username: data.data.email,
    phone: data.data.phone,
    fullname: data.data.name,
  });
}

export async function user_passchange(data: any) {
  return await axios.put(`${API_URL}/api/users/${data.id}`, {
    password: data.data.new_pass,
  });
}

export async function user_delete(id: number) {
  return await axios.delete(`${API_URL}/api/users/${id}`);
}
