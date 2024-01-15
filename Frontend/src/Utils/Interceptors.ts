import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    // Create app interceptor 
    public create() {
        // Registering to request interceptor
        axios.interceptors.request.use(requestObject => {
            // RequestObj containing data send with any request 
            if (authStore.getState().token) {
                requestObject.headers.Authorization = `Bearer ${authStore.getState().token}`
            }
            return requestObject;
        });

    }

}

const interceptors = new Interceptors();

export default interceptors;

//old token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTgsImZpcnN0TmFtZSI6IlJvZXkiLCJsYXN0TmFtZSI6IlJlZ2V2IiwiZW1haWwiOiJyb2V5cmVnZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0Iiwicm9sZUlkIjoyLCJ1c2VySW1hZ2VVcmwiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvYXBpL3JlZ2lzdGVyL2ltYWdlcy83Zjk5YzA3MC01OWUzLTQ4NmItOWUxYS05MzViNGM3MmNkOTMucG5nIn0sImlhdCI6MTcwNTM1MjEyNSwiZXhwIjoxNzA1MzgwOTI1fQ.psucCtCxv_1x28V3UEsdAIzpg86fnWngF6DHjtrQLiY