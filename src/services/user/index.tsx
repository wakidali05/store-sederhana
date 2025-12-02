import instance from "@/lib/axios/instance";

const endpoint = "/api/user";

const userServices = {
  getAllUsers: () => instance.get(endpoint),
  updateUsers: (id: string, data: any) =>
    instance.put(`/api/user/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endpoint}/${id}`),
  getProfile: () => instance.get("/api/user/profile"),
  updateProfile: (data: any) => instance.put(`/api/user/profile`, { data }),
  getCart: () => instance.get("/api/user/cart"),
  addToCart: (data: any) => instance.put("/api/user/cart", { data }),
};

export default userServices;
