import axios from 'axios';
import {API_URL} from '../../consts';

export async function all_orders_request() {
  return axios.get(`${API_URL}/api/orders`);
}
export async function current_orders_request() {
  return axios.get(`${API_URL}/api/orders?filters[status][$eq]=Processing`);
}
export async function delivered_orders_request() {
  return axios.get(`${API_URL}/api/orders?filters[status][$eq]=123123`);
}

export async function order_request({queryKey}: any) {
  return axios.get(
    `${API_URL}/api/orders/${queryKey[1]}?populate=order_items,order_items.product,order_items.product.image,address`,
  );
}
