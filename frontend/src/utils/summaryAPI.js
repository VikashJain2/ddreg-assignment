export const BASE_URL = "http://localhost:3000";

export const summaryApi = {
  register: {
    path: "/api/auth/register",
    method: "POST",
  },
  login: {
    path: "/api/auth/login",
    method: "POST",
  },
  logout:{
    path: "/api/auth/logout",
    method: "GET"
  },
  getTasks:{
    path: "/tasks",
    method: "GET"
  },
  addTask:{
    path: "/tasks",
    method: "POST"
  },
  delateTask:{
    path: '/tasks',
    method: "DELETE"
  },
  updateTask:{
    path: "/tasks",
    method: "PUT"
  },
  analytics:{
    path:"/analytics",
    method:"GET"
  }
};
