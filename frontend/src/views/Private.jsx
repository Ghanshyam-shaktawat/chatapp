import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

const Test = () => {
  const [res, setRes] = useState("");
  const api = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("chat_api/");
        setRes(response.data.response);
        console.log(response);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      <h1>Private</h1>
      <p>{res}</p>
    </section>
  );
};

export default Test;
