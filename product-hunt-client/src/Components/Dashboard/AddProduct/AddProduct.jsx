import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddProduct = () => {
    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const axiosPublic = useAxiosPublic();

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

    
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const photo = form.photo.value;
        const description = form.description.value;
        const link = form.link.value;
        const addProduct = {
            productName: name,
            productImage: photo,
            productOwnerName: user?.displayName,
            productOwnerEmail: user?.email,
            productOwnerPhoto: user?.photoURL,
            productDescription: description,
            productTags: tags.map((tag) => tag.text),
            productLink: link
        }

        // console.log(addProduct)
        // send data to database
        const res = await axiosPublic.post('/add-product', addProduct)
        console.log(res.data);
        if(res.data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your product is added",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="py-5 flex justify-center items-center">
            <div className="card w-full max-w-xl bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Add Product</h1>
                <form onSubmit={handleAddProduct} className="card-body">
                    {/* product name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter Product Name" className="input input-bordered" required />
                    </div>
                    {/* product image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Image</span>
                        </label>
                        <input type="ur" name="photo" placeholder="Enter Product Name" className="input input-bordered" required />
                    </div>
                    {/* product Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Description</span>
                        </label>
                        <textarea name="description" className="textarea textarea-bordered" placeholder="Description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Product Owner Info</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} placeholder="Enter Product Name" className="input input-bordered mt-2" required readOnly />
                        <input type="text" defaultValue={user?.photoURL} placeholder="Enter Product Name" className="input input-bordered mt-2" required readOnly />
                        <input type="text" defaultValue={user?.email} placeholder="Enter Product Name" className="input input-bordered mt-2" required readOnly />
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
                                tag: "badge badge-primary mr-2 mb-2",
                            }}
                        />
                    </div>
                    {/* External Links */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">External Links</span>
                        </label>
                        <input type="url" name="link" placeholder="Enter Product Link" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green-400 hover:bg-black hover:text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
