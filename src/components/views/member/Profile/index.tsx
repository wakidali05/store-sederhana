import styles from "./Profile.module.scss";
import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Image from "next/image";
import { User } from "@/types/user.type";

type Proptypes = {
  profile: User | any;
  setProfile: Dispatch<SetStateAction<{}>>;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfileMemberView = ({
  profile,
  setProfile,
  session,
  setToaster,
}: Proptypes) => {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");
  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: "success",
        message: "success update profile",
      });
    } else {
      setIsLoading("");
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setChangeImage({});
              form.reset();
              setToaster({
                variant: "success",
                message: "success change avatar",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "failed change avatar",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    try {
      const result = await userServices.updateProfile(
        data,
        session.data?.accessToken
      );
      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "success change password",
        });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "failed change password",
      });
    }
  };
  return (
    <MemberLayout>
      <div>
        <h1 className={styles.profile__title}>Profile Page</h1>
        <div className={styles.profile__main}>
          <div className={styles.profile__main__row}>
            <div className={styles.profile__main__row__avatar}>
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt="profile"
                  width={200}
                  height={200}
                  className={styles.profile__main__row__avatar__image}
                />
              ) : (
                <div className={styles.profile__main__row__avatar__image}>
                  {profile?.fullname?.charAt(0)}
                </div>
              )}
              <form onSubmit={handleChangeProfilePicture}>
                <label
                  htmlFor="upload-image"
                  className={styles.profile__main__row__avatar__label}
                >
                  {changeImage.name ? (
                    <p>{changeImage.name}</p>
                  ) : (
                    <>
                      <p>upload a new avatar</p>
                      <p>
                        maximum upload is <b>1 mb</b>
                      </p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  id="upload-image"
                  className={styles.profile__main__row__avatar__input}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setChangeImage(e.currentTarget.files[0]);
                  }}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className={styles.profile__main__row__avatar__button}
                >
                  {isLoading === "picture" ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </div>
            <div className={styles.profile__main__row__detail}>
              <h2>Profile</h2>
              <form onSubmit={handleChangeProfile}>
                <Input
                  label="Fullname"
                  type="teks"
                  name="fullname"
                  defaultValue={profile.fullname}
                />
                <Input
                  label="Phone"
                  type="number"
                  name="phone"
                  defaultValue={profile.phone}
                  placeholder="input your phone number"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  defaultValue={profile.email}
                  disabled
                />

                <Input
                  label="Role"
                  type="text"
                  name="role"
                  defaultValue={profile.role}
                  disabled
                />
                <Button type="submit" variant="primary">
                  {isLoading === "profile" ? "...updating" : "Update Profile"}
                </Button>
              </form>
            </div>
            <div className={styles.profile__main__row__password}>
              <h2>Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <Input
                  label="Old Password"
                  type="password"
                  name="old-password"
                  disabled={profile.type === "google"}
                  placeholder="enter your current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  name="new-password"
                  disabled={profile.type === "google"}
                  placeholder="enter your new password"
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={
                    isLoading === "password" || profile.type === "google"
                  }
                >
                  {isLoading === "password" ? "...updating" : "Update Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
