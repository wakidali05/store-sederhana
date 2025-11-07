import instance from "@/lib/axios/instance";

const authServices = {
  resgisterAccount: (data: any) => instance.post("/api/auth/register", data),
};

export default authServices;
