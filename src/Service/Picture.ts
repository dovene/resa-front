import axios from "axios";
import type { Picture } from "@/entities"

export async function fetchAllpicture() {
    const response = await axios.get<Picture[]>('http://localhost:8080/api/picture');
    return response.data;
}

