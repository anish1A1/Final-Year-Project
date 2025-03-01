"use client";
import React, { useState, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductContext } from "../../../../utils/prod";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const CreateTradeRequestPage = () => {
    const { id } = useParams();
    const { createTradeRequest } = useContext(ProductContext);
    const [successMessage, setSuccessMessage] = useState("");
    const [formError, setFormError] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        trade_id: id,
        delivery_location: "",
        product_name: "",
        quantity: 1,
        price: "",
        image: null,
        note: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file upload
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTradeRequest(formData);
            setSuccessMessage(response.message);
            toast.success(response.message);

            setFormError("");
            setTimeout(() => {
                router.push("/allTrades"); // Redirect after success
            }, 2000);
        } catch (error) {

            if (error.response && error.response.data) {
                console.log("Backend error response data:", error.response.data);
                toast.error(error.response.data || error.response.data[0]);
            console.log("Backend error response status:", error.response.status);
                setFormError(error.response.data[0]); // Assuming error is an array with the first element as error message
            } else {
                setFormError(error || "Error creating trade request.");
                toast.error(error.message || "Error creating trade request.");
            }
            console.error("Error creating trade request:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Create Trade Request
            </h1>

            {/* Success & Error Messages */}
            {formError && <p className="text-red-500 text-center mb-4">{formError}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

           
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Delivery Location */}
                    <div>
                        <label className="block text-gray-700 font-medium">Delivery Location</label>
                        <input
                            type="text"
                            name="delivery_location"
                            value={formData.delivery_location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Product Name</label>
                        <input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-gray-700 font-medium">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            min="1"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 font-medium">Price (per unit)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Upload Image */}
                    <div>
                        <label className="block text-gray-700 font-medium">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-gray-700 font-medium">Note</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
                    >
                        Submit Trade Request
                    </button>
                </form>
         
        </div>
    );
};

export default CreateTradeRequestPage;
