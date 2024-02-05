import { useContext, useEffect, useState } from "react"
import { Link } from from 'react-router-dom';
import { userAuthStore } from "../store/store";
import useAxios from "../utils/useAxios";

interface UserResponse {
  username: string;
  name: string;
  url: string;
}

const Conversation = () => {
  const [ user ] = userAuthStore((state) => [state.user()])
  const api = useAxios();

  useEffect(() => {
      async function fetchUsers {
      const response = await api.get("users/"); 
    }
  })
}

export default Conversation
