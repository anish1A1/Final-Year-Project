"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../../utils/cart";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

const MakePayment = () => {

  const { totalCartAmounts, fetchtotalCartAmount, createPaymentOfCart } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [cartID, setCartId] = useState(null);



  useEffect(() => {
    fetchtotalCartAmount();
  }, []);

  
  useEffect(() => {
    const id = searchParams.get("id");
    setCartId(id);
    
    if (!id) {
      toast.error("Cart ID is missing!");
      console.error("Cart ID is missing!");
    }
  }, [searchParams]); // Runs whenever searchParams changes

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    if (!location.trim()) {
      toast.error("Please provide a valid delivery location.");
      setProcessing(false);
      return;
    }

    try {
      const data = {
        cart: cartID,
        payment_method: paymentMethod,
        delivery_address: location,
        amount: totalCartAmounts?.total_cost || 0,
      };

      await createPaymentOfCart(data);
      toast.success("Payment Successful!");
    } catch (err) {
      setError("Payment failed. Please try again.");
      toast.error("Payment failed!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto mt-28 p-8 bg-gray-50 rounded-lg shadow-xl max-w-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900">💳 Make Payment</h1>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg">
            Total Amount:{" "}
            <span className="font-semibold text-blue-600">
              Rs. {totalCartAmounts?.total_cost || 0}
            </span>
          </p>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Select Payment Method</h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center gap-3 mb-3">
            <RadioGroupItem value="esewa" id="esewa" />
            <label htmlFor="esewa" className="text-gray-700 cursor-pointer">
              eSewa
            </label>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <RadioGroupItem value="khalti" id="khalti" />
            <label htmlFor="khalti" className="text-gray-700 cursor-pointer">
              Khalti
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="cash" id="cash" />
            <label htmlFor="cash" className="text-gray-700 cursor-pointer">
              Cash On Delivery
            </label>
          </div>
        </RadioGroup>
      </div>

      <form onSubmit={handlePayment} className="mt-6">
        <p className="mb-2">
          Email Address:{" "}
          <span className="ml-2 text-gray-700 p-1">
            {totalCartAmounts?.email || "Not Provided"}
          </span>
        </p>
        <Input
          type="text"
          placeholder="Delivery Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Button
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white"
          type="submit"
          disabled={processing}
        >
          {processing ? <Loader2 className="animate-spin mr-2" size={20} /> : "Proceed to Pay"}
        </Button>
      </form>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-500">
          <AlertCircle size={20} /> <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
