import ProfileMemberView from "@/components/views/member/Profile";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfilePage = ({ setToaster }: Proptypes) => {
  return <ProfileMemberView setToaster={setToaster} />;
};

export default ProfilePage;
