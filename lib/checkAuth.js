import axios from "axios";

export const checkAuth =
  async () => {

    try {

      const { data } =
        await axios.get(
          `${baseAPI}/api/auth/me`,
          {
            withCredentials: true,
          }
        );

      return data.user;

    } catch {

      return null;
    }
  };