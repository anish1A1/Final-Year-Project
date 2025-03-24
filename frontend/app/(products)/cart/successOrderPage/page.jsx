"use client"
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <Card className="max-w-md w-full shadow-lg rounded-2xl bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
          <Button
            className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => router.push("/MyOrders/ProductsOrders/productOrders/")}
          >
            View Order Details <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
