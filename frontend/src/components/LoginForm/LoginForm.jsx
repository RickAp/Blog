import React, { useState } from 'react';
import Input from '../Input/Input';
import ButtonLogIn from '../ButtonLogIn/ButtonLogIn';
import useFormValidation from '../../hooks/useFormValidation';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { loginRequest } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/userSlice';

const LoginForm = () => {

    const { values, errors, handleChange, validateLoginForm } = useFormValidation();
    const [loginError, setLoginError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateLoginForm()) {
            try {
                const res = await loginRequest(values);
                dispatch(login({ token: res?.data?.token, user: res?.data?.user}));
                router.push('/profile');
            } catch (error) {
                if (error instanceof AxiosError) {
                    setLoginError(error?.response?.data?.message);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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

            {errors.email && <p className="text-[14px] text-red-500 mb-2">{errors.email}</p>}
            {errors.password && <p className="text-[14px] text-red-500 mb-2">{errors.password}</p>}
            {loginError !== "" && <p className="text-[14px] text-red-500 mb-2">{loginError}</p>}

            <ButtonLogIn 
                content="Iniciar sesión"
            />
        </form>
    );
};

export default LoginForm;


