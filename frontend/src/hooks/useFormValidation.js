import { useState } from "react";

const useFormValidation = () => {
    const [values, setValues] = useState({ 
        email: '', 
        password: '', 
        username: '', 
        lastName: '', 
        title: '',
        author: '',
        date: '',
        content: '',
        newPassword: '',
    });
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const handleChange = field => event => {
        const newValue = event.target.value;
        setValues((prev) => ({ ...prev, [field]: newValue }));

        switch (field) {
            case 'username':
                if (!newValue) {
                    setErrors((prev) => ({ ...prev, username: 'El campo "Nombre" no puede estar vacío' }));
                }
                 else {
                    setErrors((prev) => ({ ...prev, username: undefined }));
                }
                break;
            case 'lastName':
                if (!newValue) {
                    setErrors((prev) => ({ ...prev, lastName: 'El campo "Apellidos" no puede estar vacío' }));
                } else {
                    setErrors((prev) => ({ ...prev, lastName: undefined }));
                }
                break;
            case 'email':
                if (!isValidEmail(newValue)) {
                    setErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido' }));
                } else {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }
                break;
            case 'password':
                if (newValue.length > 40) {
                    setErrors((prev) => ({ ...prev, password: 'La contraseña no debe exceder los 40 caracteres' }));
                } else {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                }
                break;
            case 'title':
                if (!newValue) {
                    setErrors((prev) => ({ ...prev, title: 'El campo "Titulo" no puede estar vacío' }));
                } else {
                    setErrors((prev) => ({ ...prev, title: undefined }));
                }
            case 'author':
                if (!newValue) {
                    setErrors((prev) => ({ ...prev, author: 'El campo "Autor" no puede estar vacío' }));
                } else {
                    setErrors((prev) => ({ ...prev, author: undefined }));
                }
            case 'date':
                if (!newValue) {
                    setErrors((prev) => ({ ...prev, date: 'El campo "Fecha de creación" no puede estar vacío' }));
                } else {
                    setErrors((prev) => ({ ...prev, date: undefined }));
                }
            case 'content':
                if (!newValue) {
                    setErrors((prev) => ({ ...prev, content: 'El campo "Contenido" no puede estar vacío' }));
                } else {
                    setErrors((prev) => ({ ...prev, content: undefined }));
                }
            case 'newPassword':
                if (newValue.length > 40) {
                    setErrors((prev) => ({ ...prev, newPassword: 'La contraseña no debe exceder los 40 caracteres' }));
                } else {
                    setErrors((prev) => ({ ...prev, newPassword: undefined }));
                }      
        }
    };


    const validateRegisterForm = () => {
        if (!values.username) {
            setErrors((prev) => ({ ...prev, username: 'El campo "Nombre" no puede estar vacío' }));
            return false;
        }
        if (!values.lastName) {
            setErrors((prev) => ({ ...prev, lastName: 'El campo "Apellidos" no puede estar vacío' }));
            return false;
        }
        if (!values.email || !isValidEmail(values.email)) {
            setErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido' }));
            return false;
        }
        if (values.password.length < 8 || (!values.password) || (values.password.length > 40))  {
            setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener entre 8 y 40 caracteres' }));
            return false;
        }
        return true;
    };

    const validateLoginForm = () => {
        if (!values.email || !isValidEmail(values.email)) {
            setErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido' }));
            return false;
        }
        if (values.password.length < 8 || (!values.password) || (values.password.length > 40))  {
            setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener entre 8 y 40 caracteres' }));
            return false;
        }
        return true;
    };

    const validateChangePasswordForm = () => {
        if (!values.email || !isValidEmail(values.email)) {
            setErrors((prev) => ({ ...prev, email: 'Correo electrónico inválido' }));
            return false;
        }
        if (values.password.length < 8 || (!values.password) || (values.password.length > 40))  {
            setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener entre 8 y 40 caracteres' }));
            return false;
        }
        if (values.newPassword.length < 8 || (!values.newPassword) || (values.newPassword.length > 40))  {
            setErrors((prev) => ({ ...prev, password: 'La nueva contraseña debe tener entre 8 y 40 caracteres' }));
            return false;
        }
        return true;
    };

    const validateCreatePostForm = () => {
        if (!values.title) {
            setErrors((prev) => ({ ...prev, title: 'El campo "Titulo" no puede estar vacío' }));
            return false;
        }
        if (!values.author) {
            setErrors((prev) => ({ ...prev, title: 'El campo "Autor" no puede estar vacío' }));
            return false;
        }
        if (!values.date) {
            setErrors((prev) => ({ ...prev, title: 'El campo "Fecha de creación" no puede estar vacío' }));
            return false;
        }
        if (!values.content) {
            setErrors((prev) => ({ ...prev, title: 'El campo "Contenido" no puede estar vacío' }));
            return false;
        }
        return true;
    };

    return {
        values,
        errors,
        handleChange,
        validateRegisterForm,
        validateLoginForm,
        validateCreatePostForm,
        validateChangePasswordForm,
    };
};

export default useFormValidation;