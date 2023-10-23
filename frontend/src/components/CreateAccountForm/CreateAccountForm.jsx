import React, { useState } from 'react';
import Input from '../Input/Input';
import ButtonLogIn from '../ButtonLogIn/ButtonLogIn';
import useFormValidation from '../../hooks/useFormValidation';
import { useRouter } from 'next/router';
import { registerRequest } from '../../../api/auth';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/userSlice';

const CreateAccountForm = () => {

    const { values, errors, handleChange, validateRegisterForm } = useFormValidation();
    const [registerError, setRegisterError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateRegisterForm()) {
            try {
                const res = await registerRequest(values);
                dispatch(login({ token: res?.data?.token, user: res?.data?.user}));
                router.push('/profile');
            } catch (error) {
                if (error instanceof AxiosError) {
                    setRegisterError(error?.response?.data?.message);
                }
            } 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                label="Nombre"
                placeholder="Nombre"
                value={values.username}
                onChange={handleChange('username')}
            />

            <Input
                type="text"
                label="Apellidos"
                placeholder="Apellidos"
                value={values.lastName}
                onChange={handleChange('lastName')}
            />

            <Input
                type="text"
                label="Correo electrónico"
                placeholder="Correo electrónico"
                value={values.email}
                onChange={handleChange('email')}
            />

            <Input
                type="password"
                label="Contraseña"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange('password')}
            />
            {errors.username && <p className="text-[14px] text-red-500 mb-2">{errors.username}</p>}
            {errors.lastName && <p className="text-[14px] text-red-500 mb-2">{errors.lastName}</p>}
            {errors.email && <p className="text-[14px] text-red-500 mb-2">{errors.email}</p>}
            {errors.password && <p className="text-[14px] text-red-500 mb-2">{errors.password}</p>}
            {registerError !== "" && <p className="text-[14px] text-red-500 mb-2">{registerError}</p>}

            <div className='mb-11'>
                <ButtonLogIn 
                    content="Registrarse"
                />
            </div>
            
        </form>
    );
};

export default CreateAccountForm;