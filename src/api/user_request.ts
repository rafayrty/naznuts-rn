import axios from 'axios';

export async function user_update(data: any) {
  return await axios.put('http://localhost:1337/api/users/' + data.id, {
    username: data.data.email,
    phone: data.data.phone,
    fullname: data.data.name,
  });
}

export async function user_passchange(data: any) {
  return await axios.put('http://localhost:1337/api/users/' + data.id, {
    password: data.data.new_pass,
  });
}

export async function user_delete(id: number) {
  return await axios.delete('http://localhost:1337/api/users/' + id);
}
