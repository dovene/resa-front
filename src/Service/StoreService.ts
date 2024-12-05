import axios from "axios";
import type { Store } from "@/entities"
export async function fetchAllStore() {
  const response = await axios.get<Store[]>('http://localhost:8080/api/store');
  return response.data;
}
