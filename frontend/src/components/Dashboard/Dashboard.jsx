import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GenericButton from "../GenericButton/GenericButton";
import Paragraph from "../Paragraph/Paragraph";
import { postsRequest } from "../../../api/auth";
import Post from "../Post/Post";

const POSTS_PER_PAGE = 12;

const Dashboard = ({ searchTerm, setSearchTerm }) => {

    const TOKEN_REDUX = useSelector((state) => state.user.token);
    const updatedPosts = useSelector((state) => state.user.posts);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    //const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        
        const getPosts = async () => {
            let token = TOKEN_REDUX;

            if (!token) {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    token = storedToken;
                }
            }

            if (token) {
                try {
                    const res = await postsRequest(token);
                    console.log(res?.data);
                    setPosts(res?.data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Ha ocurrido un error al obtener el token");
            }
        };

        getPosts();
    }, [updatedPosts]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <div className="w-11/12 h-4/5 mx-auto my-4 bg-[var(--dashboard-bg)] rounded-lg">
            <div className="flex flex-wrap max-w-full mobile:justify-center">
                {paginatedPosts.map((post, index) => (
                    <div key={index} className="desktop:w-full p-4 transform transition hover:translate-y-[-7px] hover:shadow-lg cursor-pointer">
                        <Post 
                            title={`${post.title}`}
                            content={`${post.content}`}
                            author={`${post.author}`}
                            date={`${post.date}`}
                            id={`${post._id}`}
                        />
                    </div>
                ))}
            </div>
            {posts.length === 0 && (
                <div className="text-center mt-11 mb-11">
                    <Paragraph
                        content="Todo muy solo por aquí, crea un post!"
                        color="text-white"
                        size="xxxl"
                        fontWeight="font-[700]"
                        textAlign="center"
                    />
                </div>
            )}

            <div className="flex justify-center mt-4 mb-4 space-x-4">
                <GenericButton
                    content="Anterior"
                    backgroundColor="bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] transition duration-300 ease-in-out cursor-pointer"
                    textColor="text-white"
                    width="w-[120px]"
                    height="h-[40px]"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                <GenericButton
                    content="Siguiente"
                    backgroundColor="bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] transition duration-300 ease-in-out cursor-pointer"
                    textColor="text-white"
                    width="w-[120px]"
                    height="h-[40px]"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * POSTS_PER_PAGE >= posts.length}
                />
            </div>
        </div>
    );
};

export default Dashboard;