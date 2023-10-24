import React, { useState } from 'react';
import Paragraph from '../Paragraph/Paragraph';
import GenericButton from '../GenericButton/GenericButton';
import { useRouter } from 'next/router';

const Post = ({ title, content, author, date, id }) => {

    const truncateContent = (content, wordLimit) => {
        const words = content.split(' ');
        if(words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return content;
    };

    const router = useRouter();

    const viewPost = () => {
        router.push(`/posts/${id}`);
    };
    

    return(
        <div className='flex flex-col w-full h-full border-2 border-[var(--card-border)] rounded-lg p-10 hover:border-[black] transition duration-300 ease-in-out break-words bg-white'>
            <Paragraph
                content={title}
                color='text-black'
                size='xxxl'
                fontWeight='font-bold'
                textAlign='center'
                classes='mb-4'
            />
            <Paragraph
                content={truncateContent(content, 70)}
                color='text-gray-700'
                size='lg'
                fontWeight='font-normal'
                textAlign='justify'
                classes='mb-6'
            />
            <div className='mt-auto'>
                <div className='flex justify-between items-center text-gray-500'>
                    <Paragraph
                        content={date}
                        color='text-gray-500'
                        size='sm'
                        fontWeight='font-medium'
                        textAlign='left'
                    />
                    <Paragraph
                        content={author}
                        color='text-gray-500'
                        size='sm'
                        fontWeight='font-medium'
                        textAlign='right'
                    />
                </div>
                <div className='mt-4 flex justify-center'>
                    <GenericButton
                        content="Ver Post"
                        backgroundColor="bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] transition duration-300 ease-in-out"
                        textColor="text-white"
                        width="desktop:w-1/4 mobile:w-full"
                        height="h-10" 
                        onClick={viewPost} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Post;