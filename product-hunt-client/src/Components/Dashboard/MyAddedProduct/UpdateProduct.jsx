import { useLoaderData, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
    const { productName, productImage, productDescription, _id, productTags, productLink } = useLoaderData();
    const [tags, setTags] = useState([]);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // console.log(productName)

    // fetch the tags and show in a input by default
    useEffect(() => {
        if (productTags && Array.isArray(productTags)) {
            const showTagInInput = productTags.map(tag => ({ id: tag, text: tag }));
            setTags(showTagInInput);
        }
    }, [])

    // ReactTag Handlers
    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    // update the form data
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const form = e.target
        const updateProduct = {
            productName: form.name.value,
            productImage: form.photo.value,
            productDescription: form.description.value,
            productTags: tags.map((tag) => tag.text), // Extract text values from tags
            productLink: form.link.value,
        }
        // console.log(updateProduct)
        // send to data backend to update 
        const res = await axiosPublic.patch(`/updateProduct/${_id}`, updateProduct)
        // console.log(res.data)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Update!",
                text: "Your file has been updated.",
                icon: "success"
            });
            navigate('/dashboard/my-product')
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="card w-full max-w-xl my-10 bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Add Product</h1>
                <form onSubmit={handleUpdateProduct} className="card-body">
                    {/* product name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Name</span>
                        </label>
                        <input type="text" defaultValue={productName} name="name" placeholder="Enter Product Name" className="input input-bordered" required />
                    </div>
                    {/* product image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Image</span>
                        </label>
                        <input type="ur" defaultValue={productImage} name="photo" placeholder="Enter Product Name" className="input input-bordered" required />
                    </div>
                    {/* product Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Description</span>
                        </label>
                        <textarea name="description" defaultValue={productDescription} className="textarea textarea-bordered" placeholder="Description"></textarea>
                    </div>
                    {/* tag input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Tags</span>
                        </label>
                        <ReactTags
                            tags={tags}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            delimiters={[188, 13]}
                            placeholder="Add new tag use Comma and Enter key after every single tag"
                            classNames={{
                                tags: "tags-input",
                                tagInputField: "input input-bordered w-full",
                                tag: "badge bg-green-400 mr-2 mb-2",
                            }}
                            defaultValue={productTags}
                        />
                    </div>
                    {/* External Links */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">External Links</span>
                        </label>
                        <input type="url" defaultValue={productLink} name="link" placeholder="Enter Product Link" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green-400 hover:bg-black hover:text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;