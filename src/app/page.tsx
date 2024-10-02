// app/page.tsx

import Image from "next/image";
import SignupForm from "./signup/page";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NextRequest } from "next/server";

export default async function Home(req: NextRequest) {
  const user = await fetchData(req);
  console.log(user);

  return (
    <div>
      {/* Render your user data here */}
      {user && <p>User: {JSON.stringify(user)}</p>}
    </div>
  );
}

export async function fetchData(req: NextRequest) {
  // Transform headers for Axios
  const axiosHeaders = Object.fromEntries(
    // Convert each header to lowercase
    Object.entries(req.headers).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ])
  );

  const { data } = await axios.get(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user",
    {
      headers: {
        Host: "tickets.com", // Ensure you set the Host header if needed
        ...axiosHeaders,
      },
    }
  );

  return data; // This will be returned to the Home component
}
