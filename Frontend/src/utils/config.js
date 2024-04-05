const dev = {
  BASE_URL: "http://localhost:8080/api",
};

const prod = {
  BASE_URL: "https://backend-1gia.onrender.com/api",
    // BASE_URL: "https://mflix-server.azurewebsites.net/api",
    
};

// eslint-disable-next-line no-undef
export const config = process.env.NODE_ENV === "development" ? dev : prod;
