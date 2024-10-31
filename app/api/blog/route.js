import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import { writeFile } from 'fs/promises'
import BlogModel from "@/lib/models/BlogModels";


const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(request) {
    return NextResponse.json({ msg: "API working" })
}

export async function POST(request) {
    // get data from request
    const formData = await request.formData();
    // create a timestamp to use
    const timestamp = Date.now();

    // get image data
    const image = formData.get('image');
    // turn into array Buffer
    const imageByteData = await image.arrayBuffer();
    // turn to buffer
    const buffer = Buffer.from(imageByteData);
    // store in public
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    // create url to use
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog saved")
    return NextResponse.json({success:true, msg:"Blog Added"})

}