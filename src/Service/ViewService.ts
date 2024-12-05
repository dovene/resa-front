import axios from "axios";
import type {View } from "@/entities"


export async function fetchOneView(id:number) {
  const response = await axios.get<View>('http://localhost:8080/api/view/'+id);
  return response.data;
}

export async function fetchAllView() {
    const response = await axios.get<View[]>('http://localhost:8080/api/view');
    return response.data;
}

export async function postView(view:View) {
  const response = await axios.post<View>('http://localhost:8080/api/view', view);
  return response.data;
}

export async function DeleteView(id:number) {
  const response = await axios.delete<View>('http://localhost:8080/api/view/'+ id);
  return response.data;
}

export async function updateView( view:View) {
  return (await axios.put<View>(`http://localhost:8080/api/view/${view.id}`, view)).data;
}


