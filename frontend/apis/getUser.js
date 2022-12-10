import axios from "axios";

const getUser = async ({ access_token, id_token }) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`,
      { access_token, id_token }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getUser;
