import axios from "axios";

export const checkAuth =
  async () => {

    try {

      const { data } =
        await axios.get(
          "http://localhost:3200/api/auth/me",
          {
            withCredentials: true,
          }
        );

      return data.user;

    } catch {

      return null;
    }
  };