'use client'

import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/author_img.png",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        return () => {
          if (image) {
            URL.revokeObjectURL(image);
          }
        };
      }, [image]);

      const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image',image);
      }

    return (
        <>
            <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload thumbnail</p>
                <div className='w-[140px]'>
                    <label htmlFor='image'>
                        <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
                </div>

                <p className='text-xl mt-4'>Blog title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type here' required></input>

                <p className='text-xl mt-4'>Blog description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Write content here...' rows={6} required></textarea>

                <p className='text-xl mt-4'>Blog category</p>
                <select name='category' onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>

                <br />
                <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>

            </form>
        </>
    )
}

export default page