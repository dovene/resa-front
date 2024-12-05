import axios from "axios";
import router from "./router";
import { useAuth } from "@/stores/auth";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['X-Requested-With'] ='XMLHttpRequest';

axios.interceptors.response.use(null, (error) => {

    if(error.response.status == 401) {
        const auth = useAuth();
        auth.logout();
        router.push('/login');
    }
    return Promise.reject(error);
});
