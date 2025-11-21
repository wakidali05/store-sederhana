import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

// signup function
export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    image?: string;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);
  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.image = "";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}
// signin function
export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}
// signin with google function
export async function loginWithGoogle(
  data: {
    id?: string;
    email: string;
    role?: string;
    created_at?: Date;
    image?: string;
    updated_at?: Date;
    password?: string;
  },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (status: boolean, res: any) => {
      data.id = res.path.replace("user/", "");
      if (status) {
        callback(data);
      }
    });
  }
}
