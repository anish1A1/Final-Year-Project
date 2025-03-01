"use client";

import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../../utils/prod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const MakePayment = () => {
  const { totalCartAmounts } = useContext(ProductContext);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setProcessing(true);
    setError("");
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
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
          <p className="text-gray-700 text-lg">Total Amount: <span className="font-semibold text-blue-600">Rs. {totalCartAmounts?.total_cost || 0}</span></p>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Select Payment Method</h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center gap-3 mb-3">
            <RadioGroupItem value="esewa" id="esewa" />
            <label htmlFor="esewa" className="text-gray-700 cursor-pointer">eSewa</label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="khalti" id="khalti" />
            <label htmlFor="khalti" className="text-gray-700 cursor-pointer">Khalti</label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white" 
        onClick={handlePayment} 
        disabled={processing}
      >
        {processing ? <Loader2 className="animate-spin mr-2" size={20} /> : "Proceed to Pay"}
      </Button>
      
      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-500">
          <AlertCircle size={20} /> <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
