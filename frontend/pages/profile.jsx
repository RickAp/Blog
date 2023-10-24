import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileRequest } from "../api/auth";
import { useRouter } from 'next/router';
import NavBar from "@/components/NavBar/NavBar";
import Dashboard from "@/components/Dashboard/Dashboard";

const Profile = () => {

    const TOKEN = useSelector((state) => state.user.token);
    const USER = useSelector((state) => state.user.user);
    const router  = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await profileRequest(TOKEN);
          console.log(res);
        } catch (error) {
          router.push('/');
        }
      };
    
      if (TOKEN) {
        localStorage.setItem('token', TOKEN);
        fetchData();
      } else if (!localStorage.getItem('token')) {
        router.push('/');
      }
    }, [TOKEN]);
    
    return (
      <div className="flex flex-col w-full h-full bg-gray-100">
        <div>
            <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex justify-center mt-11">
            <Dashboard searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div> 
      </div>
    );
  };
  
  export default Profile;
