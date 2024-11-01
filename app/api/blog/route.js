import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import { writeFile } from 'fs/promises'
import BlogModel from "@/lib/models/BlogModels";
const fs = require('fs')

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();


// API EndPoint to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs })
    }
}

// API Endpoint for Uploading Blogs
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
    return NextResponse.json({ success: true, msg: "Blog Added" })

}


// API Endpoint to delete blog
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');

    const blog = await BlogModel.findById(id);

    fs.unlink(`./public${blog.image}`, () => {})

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({msg:"Blog Deleted."})
}