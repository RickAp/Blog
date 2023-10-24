import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import useFormValidation from "@/hooks/useFormValidation";
import { createPost } from "../../../api/auth";
import { addPost } from "../../../redux/userSlice";
import Paragraph from "../Paragraph/Paragraph";
import Input from "../Input/Input";
import ButtonLogIn from "../ButtonLogIn/ButtonLogIn";
import { useSelector } from "react-redux";

const CreatePostForm = () => {

    const { values, errors, handleChange, validateCreatePostForm, } = useFormValidation();
    const TOKEN = localStorage.getItem('token');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if ((TOKEN !== null) && (validateCreatePostForm())) {
            try {
                const res = await createPost(TOKEN ,values);
                console.log(res);
                setTitle(res?.data?.title);
                setContent(res?.data?.content);
                setAuthor(res?.data?.author);
                setDate(res?.data?.date);
                setId(res?.data?._id);
                dispatch(addPost(res?.data));
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Lo sentimos, ha ocurrido un error al obtener el token")
        }
    };
    return (
        <form onSubmit={handleSubmit} className= "flex flex-col justify-center items-center">
            <div className="mb-10 text-center">
                <Paragraph 
                    content='Crea un post sobre el tema que quieras!'
                    size='lg'
                    fontWeight='font-[700]'
                />
            </div>

            <Input
                type="text"
                label="Titulo"
                placeholder="Titulo del post"
                value={values.title}
                onChange={handleChange('title')}
            />
        
            <label htmlFor="content" className="text-bold font-[700]">Contenido</label>
            <textarea
                placeholder="Contenido del post"
                value={values.content}
                onChange={handleChange('content')}
                rows={4} 
                className="w-[316px] border border-[var(--grayscale-gray-lightest)] border-1 px-3 focus:outline-none"
            />

            <Input
                type="date"
                label="Fecha de creación"
                placeholder="Fecha de creacion del post"
                value={values.date.toString().split('T')[0]}
                onChange={handleChange('date')}
            />

            <Input
                type="text"
                label="Autor"
                placeholder="Autor del post"
                value={values.author}
                onChange={handleChange('author')}
            />

            {errors.title && <p className="text-[14px] text-red-500 mb-2">{errors.title}</p>}
            {errors.content && <p className="text-[14px] text-red-500 mb-2">{errors.content}</p>}
            {errors.author && <p className="text-[14px] text-red-500 mb-2">{errors.author}</p>}
            {errors.date && <p className="text-[14px] text-red-500 mb-2">{errors.date}</p>}

            <ButtonLogIn 
                content="Crear post"
            />
        </form>
    );
};

export default CreatePostForm;