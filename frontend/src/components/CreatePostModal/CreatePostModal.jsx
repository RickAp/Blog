import React, { useState } from "react";
import Modal from 'react-modal'
import CreatePostForm from "../CreatePostForm/CreatePostForm";

const CreatePostModal = ({ isOpen, onClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className='fixed inset-0 flex bg-[white] desktop:mr-[400px] mobile:mr-[25px] desktop:ml-[400px] mobile:ml-[25px] desktop:mt-[20px] mobile:mt-[50px] desktop:mb-[20px] mobile:mb-[50px] items-center justify-center rounded-lg'
            overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black"
        >
            <div>
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <img src="equis.png" alt="icono equis" className='h-[20px] w-[20px]' />
                </button>
            </div>
            <CreatePostForm />
        </Modal>
    );
};

export default CreatePostModal;