import axios from "axios";
import type { Activity } from "@/entities"



export async function fetchAllActivityByCategory(id:string) {
  const response = await axios.get<Activity[]>('http://localhost:8080/api/activity/category/'+id);
  return response.data;
}

export async function fetchOneActivity(id:number) {
  const response = await axios.get<Activity>('http://localhost:8080/api/activity/'+id);
  return response.data;
}

export async function fetchOneActivityDelete(id:number) {
  const response = await axios.delete<Activity>('http://localhost:8080/api/activity/'+id);
  return response.data;
}

export async function postUpload(image:File) {
  const response = await axios.postForm<string>('http://localhost:8080/api/activity/upload',{
      image
  });
  return response.data;
}
export async function postActivity(activity: Activity) {
  const response = await axios.post<Activity>('http://localhost:8080/api/activity', activity);
  return response.data;
}
