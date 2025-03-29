import axios from "axios";

// the baseURL should to point to localhost in development
// and your domain in production
const app = axios.create({
    baseURL: process.env.NODE_ENV === "development"
      ? `http://localhost:5100/`
      : "/",
});

//configure axios to use token
//check if token exist on local storage
//set it up in the headers
app.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
)

// axios consumes rejected API responses by default,
// so the configuration below intercepts the those
// responses and passes them down to the function that
// uses our custom "app" axios configuration.
app.interceptors.response.use(
    response => response,
    error => {

        return Promise.reject(error.message);
    }
);

export default app;