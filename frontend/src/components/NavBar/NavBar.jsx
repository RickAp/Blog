import React, { useState } from 'react';
import Link from 'next/link';
import GenericButton from '../GenericButton/GenericButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userSlice';
import { useRouter } from 'next/router';
import Logo from '../Logo/Logo';
import CreatePostModal from '../CreatePostModal/CreatePostModal';

const NavBar = ({ searchTerm, setSearchTerm }) => {

    const dispatch = useDispatch();
    const router  = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const logoutSession = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between mobile:bg-[var(--dashboard-bg)]'>
                <div className='mt-5 ml-5 mobile:mb-5'>
                    <Link href={'/profile'}>
                        <Logo width="w-[35px]" height="h-[35px]" />
                    </Link>
                </div>

                <div className='flex mobile:hidden'>
                    <div className='mt-4 mr-5'>
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mr-8 p-2 border 2 border-gray-300 rounded-lg shadow-lg"
                        />
                        <GenericButton
                            content='Crear un Post'
                            backgroundColor='bg-[white] shadow-lg'
                            textColor='text-black'
                            width="w-[150px]"
                            height="h-[40px]"
                            hover="hover:text-[var(--hover-create)] transition duration-300 ease-in-out"
                            border="border 2 border-[black]"
                            onClick={openModal}
                        />
                    </div>

                    <div className='mt-4 mr-5'>
                        <GenericButton
                            content='Cerrar sesión'
                            backgroundColor='bg-[white] shadow-lg'
                            textColor='text-black'
                            width="w-[150px]"
                            height="h-[40px]"
                            hover="hover:text-[#FC6444] transition duration-300 ease-in-out"
                            border="border 2 border-[black]"
                            onClick={logoutSession}
                        />
                    </div>
                </div>
                <CreatePostModal
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                />
            </div>

            <div className='flex desktop:hidden justify-center'>
                <div className='flex flex-col'>
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mr-8 p-2 border 2 border-gray-300 rounded-lg shadow-lg"
                    />

                    <div className='flex'>
                        <div className='mt-4 mr-5'>
                            <GenericButton
                                content='Crear un Post'
                                backgroundColor='bg-[white]'
                                textColor='text-black mobile:text-[var(--hover-create)]'
                                width="desktop:w-[150px] mobile:w-[150px]"
                                height="h-[40px]"
                                hover="hover:text-[var(--hover-create)] transition duration-300 ease-in-out"
                                border="border 2 border-[black]"
                                onClick={openModal}
                            />
                        </div>

                        <div className='mt-4 desktop:mr-5'>
                            <GenericButton
                                content='Cerrar sesión'
                                backgroundColor='bg-[white]'
                                textColor='text-black mobile:text-[#FC6444]'
                                width="desktop:w-[150px] mobile:w-[150px]"
                                height="h-[40px]"
                                hover="hover:text-[#FC6444] transition duration-300 ease-in-out"
                                border="border 2 border-[black]"
                                onClick={logoutSession}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;