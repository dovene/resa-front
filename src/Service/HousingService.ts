import axios from "axios";
import type { Housing } from "@/entities"

export async function fetchOneHousing(id:number) {
  const response = await axios.get<Housing>('http://localhost:8080/api/housing/'+id);
  return response.data;
}
