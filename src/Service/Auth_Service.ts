
import type { User } from "@/entities";
import axios from "axios";


export async function fetchLogin(email:string,password:string) {
    const response = await axios.get<User>('http://localhost:8080/api/user', {
        auth: {
            username: email,
            password

        }
    });
    console.log(response.data);
    return response.data

}
export async function fetchLogout() {
    await axios.get<void>('/api/logout');
}

export async function postRegister(user:User) {
    const response = await axios.post<User>("http://localhost:8080/api/user", user);
    return response.data
}

export async function getUserByid(id: number ) {
    const response = await axios.get<User>("http://localhost:8080/api/user/"+ id);
    return response.data

}
