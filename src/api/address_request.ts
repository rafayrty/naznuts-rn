import axios from 'axios';

export async function cities_request() {
  return await axios.get('http://localhost:1337/api/cities');
}

export async function address_add(data: any) {
  return await axios.post('http://localhost:1337/api/addresses', {data: data});
}

export async function address_request() {
  return await axios.get('http://localhost:1337/api/addresses');
}

export async function address_update(data: any) {
  return await axios.put('http://localhost:1337/api/addresses/' + data.id, {
    data: data.data,
  });
}
