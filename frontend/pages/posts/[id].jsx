import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPost } from "../../api/auth";
import { useSelector } from "react-redux";
import Paragraph from "@/components/Paragraph/Paragraph";
import GenericButton from "@/components/GenericButton/GenericButton";
import NavBar from "@/components/NavBar/NavBar";
import { deletePost, profileRequest } from "../../api/auth";
import { toast } from 'react-toastify';

const PostDetail = () => {

    const TOKEN_REDUX = useSelector((state) => state.user.token);
    const USER = useSelector((state) => state.user.user);
    const [post, setPost] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    console.log(USER);

    useEffect(() => {
        const TOKEN = localStorage.getItem('token');
        setToken(TOKEN);
    }, [])

    useEffect(() => {
        const getPostDetail = async () => {

            let token = TOKEN_REDUX;

            if (!token) {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    token = storedToken;
                }
            }

            if (token && id) {
                try {
                    const res = await getPost(token, id);
                    console.log(res?.data);
                    setPost(res?.data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Ha ocurrido un error al obtener el token");
            }
        };

        getPostDetail();
    }, [id]);

    useEffect(() => {
        const getfetchProfile = async () => {

            let token = TOKEN_REDUX;

            if (!token) {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    token = storedToken;
                }
            }

            if (token && id) {
                try {
                    const res = await profileRequest(token);
                    console.log(res?.data);
                    setUserId(res.data?._id)
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Ha ocurrido un error al obtener el token");
            }
        };

        getfetchProfile();
    }, [id]);

    const deleteInvitationFunction = () => {
        if (token!== null) {
            try {
                const res = deletePost(token, id);
                if (post?.user?._id === userId) {
                    router.push("/profile");
                } else {
                    toast.error("No puedes eliminar este post porque no eres el usuario que lo creó.");
                }
            } catch (error) {
                console.log(error);   
            } 
        } else {
            console.log("Lo sentimos, ha ocurrido un error al obtener el token");
        } 
    };


    return(
        <div className="min-h-screen bg-gray-100 sm:px-6 lg:px-8">
            <NavBar />
            <div className="flex">
                <div className="flex flex-col space-y-3 ml-10 mr-8 mt-11 mobile:hidden">
                    <div className="w-[260px] h-[50px] flex justify-between items-center flex-nowrap p-4 border border-solid border-[1px] border-gray-300 rounded-md cursor-pointer shadow-md">
                        <h2 className='text-[17px] font-medium'>News</h2>
                        <img 
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-224-chevron-right-d1f88a6c15e68190c3b47e1ee4f39fe47f4b69f4966ca7c250c2e14cfa689a04.svg"
                            className="w-[16px] h-[16px]"
                        />
                    </div>

                    <div className="w-[260px] h-[50px] flex justify-between items-center flex-nowrap p-4 border border-solid border-[1px] border-gray-300 rounded-md cursor-pointer shadow-md">
                        <h2 className='text-[17px] font-medium'>Popular</h2>
                        <img 
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-224-chevron-right-d1f88a6c15e68190c3b47e1ee4f39fe47f4b69f4966ca7c250c2e14cfa689a04.svg"
                            className="w-[16px] h-[16px]"
                        />
                    </div>

                    <div className="w-[260px] h-[50px] flex justify-between items-center flex-nowrap p-4 border border-solid border-[1px] border-gray-300 rounded-md cursor-pointer shadow-md">
                        <h2 className='text-[17px] font-medium'>Categories</h2>
                        <img 
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-224-chevron-right-d1f88a6c15e68190c3b47e1ee4f39fe47f4b69f4966ca7c250c2e14cfa689a04.svg"
                            className="w-[16px] h-[16px]"
                        />
                    </div>
                </div>

                <div className='w-full mx-auto bg-white p-8 border rounded-lg shadow-lg mt-11 desktop:mr-10'>
                    {post && (
                        <div>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">{post.title}</h1>
                            <div className="text-gray-600 text-lg mb-6 whitespace-pre-wrap">{post.content}</div>
                            <div className='flex justify-between items-center text-gray-500 mb-4'>
                                <p className="text-sm">{post.date}</p>
                                <p className="text-sm">{post.author}</p>
                            </div>
                            <div className='flex justify-center space-x-5'>
                                < GenericButton
                                    content={"Regresar"}
                                    backgroundColor="bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] transition duration-300 ease-in-out"
                                    textColor="text-white"
                                    width="desktop:w-1/4 mobile:w-full"
                                    height="h-10" 
                                    onClick={() => {router.push("/profile")}}
                                />
                                < GenericButton
                                    content={"Eliminar"}
                                    backgroundColor="bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
                                    textColor="text-white"
                                    width="desktop:w-1/4 mobile:w-full"
                                    height="h-10" 
                                    onClick={deleteInvitationFunction}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
        </div> 
    );
};

export default PostDetail;