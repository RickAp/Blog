import React, { useState } from 'react';
import Input from '../Input/Input';
import ButtonLogIn from '../ButtonLogIn/ButtonLogIn';
import useFormValidation from '../../hooks/useFormValidation';
import { useRouter } from 'next/router';
import { changePassword } from '../../../api/auth';
import { AxiosError } from 'axios';

const ChangePasswordForm = () => {

    const { values, errors, handleChange, validateChangePasswordForm } = useFormValidation();
    const [changePasswordError, setChangePasswordError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateChangePasswordForm()) {
            try {
                const res = await changePassword(values);
                router.push('/');
            } catch (error) {
                if (error instanceof AxiosError) {
                    setChangePasswordError(error?.response?.data?.message);
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

            <Input
                type="password"
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                value={values.newPassword}
                onChange={handleChange('newPassword')}
            />

            {errors.email && <p className="text-[14px] text-red-500 mb-2">{errors.email}</p>}
            {errors.password && <p className="text-[14px] text-red-500 mb-2">{errors.password}</p>}
            {changePasswordError !== "" && <p className="text-[14px] text-red-500 mb-2">{changePasswordError}</p>}

            <ButtonLogIn 
                content="Cambiar contraseña"
            />
        </form>
    );
};

export default ChangePasswordForm;