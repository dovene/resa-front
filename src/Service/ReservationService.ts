import axios from "axios";
import type {  Reservation } from "@/entities"

export async function fetchAllReservation() {
    const response = await axios.get<Reservation[]>('http://localhost:8080/api/reservation');
    return response.data;
}

export async function fetchOneReservation(id:number) {
  const response = await axios.get<Reservation>('http://localhost:8080/api/reservation/'+id);
  return response.data;
}

export async function ReservationDelete(id:number) {
  const response = await axios.delete<Reservation>('http://localhost:8080/api/reservation/'+id);
  return response.data;
}

export async function updateReservation(id: number, data: Partial<Reservation>) {
  return (await axios.put<Reservation>(`http://localhost:8080/api/reservation/${id}`, data)).data;
}

export async function postReservation(reservation:Reservation) {
  const response = await axios.post<Reservation>('http://localhost:8080/api/reservation', reservation);
  return response.data;
}
//Créer une fonction updateReservation qui attendra une Reservation en argument, qui fera un put vers la route PUT définie dans le bac
