"use client";
import React, { useState, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductContext } from "../../../../utils/prod";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomBreadCrumb from "@/Impcomponent/CustomBreadCrumb";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            const errorNotes = error.note && error.note[0] || error[0];
            if (errorNotes) {
                toast.error(errorNotes);
                return;
            }
            if (error.response && error.response.data) {
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

    const routesLocations = [
        {href: "/", label: "Home"},
        {href: "/allTrades", label: "All Trades"},
        { label: "Create Trade Request"},

    ];

    return (
        <div className="min-h-screen mt-24 bg-gray-100">
            <div className="flex justify-center items-center pt-4">
                <Card className="w-full max-w-2xl shadow-lg rounded-xl bg-white mt-2 ">
                    <div className=" p-3 border-b bg-gray-100 ">
                        <CustomBreadCrumb items={routesLocations}/>
                    </div>

                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Create Trade Request</CardTitle>
                    </CardHeader>

            <CardContent>
                        
                <form onSubmit={handleSubmit} className="grid gap-4">
                    
                    {/* Product Name */}
                    <div>
                        <Label >Product Name</Label>
                        <Input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            placeholder="Enter product name to give.."
                        />
                    </div>
                    

                    

                    {/* Quantity */}
                    <div>
                        <Label >Quantity</Label>
                        <Input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            min="1"
                            required
                        />
                    </div>

                    {/* Delivery Location */}
                    
                    
                    

                    

                    <div>
                        <Label >Delivery Location</Label>
                        <Input
                            type="text"
                            name="delivery_location"
                            value={formData.delivery_location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            placeholder="e.g.  Sunsari, Dharan-1, BhanuChowk "

                        />
                    </div>

                    {/* Upload Image */}
                    <div>
                        <Label htmlFor="image" className="">Upload Image</Label>
                        <Input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg"
                            className=" text-slate-800 hover:border-gray-500"
                        />
                    </div>

                    {/* Note */}
                    <div>
                        <Label >Note</Label>
                        <Textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows="2"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. I would like to trade with these products.."
                        ></Textarea>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white  py-3 px-4 rounded-md transition duration-300"
                    >
                        Submit Trade Request
                    </Button>
                </form>
            </CardContent>
                </Card>
            </div>
           
            

           
         
        </div>
    );
};

export default CreateTradeRequestPage;

