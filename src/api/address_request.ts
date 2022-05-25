import axios from 'axios';
import {API_URL} from '../../consts';

export async function cities_request() {
  return await axios.get(`${API_URL}/api/cities`);
}

export async function address_add(data: any) {
  return await axios.post(`${API_URL}/api/addresses`, {data: data});
}

export async function address_request() {
  return await axios.get(`${API_URL}/api/addresses`);
}

export async function address_update(data: any) {
  return await axios.put(`${API_URL}/api/addresses/${data.id}`, {
    data: data.data,
  });
}
