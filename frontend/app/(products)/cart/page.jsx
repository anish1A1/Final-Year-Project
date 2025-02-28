"use client";

import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../utils/prod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const CartPage = () => {
  const {
    fetchCart,
    updateCart,
    removeFromCart,
    loading,
    cartItem,
    updateCartProductSelection,
    totalCartAmounts,
    fetchtotalCartAmount,
  } = useContext(ProductContext);

  const [quantity, setQuantity] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchtotalCartAmount();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    const initialSelections = {};
    if (cartItem) {
      cartItem.forEach((item) => {
        initialQuantities[item.id] = item.product_qty;
        initialSelections[item.id] = item.is_selected;
      });
      setQuantity(initialQuantities);
      setSelectedItems(initialSelections);
    }
  }, [cartItem]);

  const handleQuantityChange = (id, qty) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [id]: qty,
    }));
  };

  const handleUpdateCart = async (id, product_id) => {
    const product_qty = quantity[id];
    const is_selected = selectedItems[id];
    try {
      const response = await updateCart(id, product_qty, product_id, is_selected);
      await fetchtotalCartAmount();
      toast.success(response.message);
    } catch (error) {
      setError(error.product_qty ? error.product_qty[0] : "Error updating quantity in cart.");
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      const data = await removeFromCart(id);
      await fetchtotalCartAmount();
      toast.success(data.message);
    } catch (error) {
      setError(error.message);
      console.error("Error removing item from cart:", error);
    }
  };

  const toggleSelection = async (id, product_id) => {
    const newSelection = { ...selectedItems, [id]: !selectedItems[id] };
    setSelectedItems(newSelection);

    const is_selected = newSelection[id];

    try {
      const response = await updateCartProductSelection(id, is_selected, product_id);
      await fetchtotalCartAmount();
      toast.success(response.message);
    } catch (error) {
      setError(error.message || "Error selecting product in cart.");
      toast.error(error.message || "Error selecting product in cart.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-500" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-24 p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">🛒 Your Shopping Cart</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {cartItem && !loading && cartItem.length > 0 ? (
        <div className="grid gap-2">
          {cartItem.map((item) => (
            <Card key={item.id} className="flex flex-col lg:flex-row gap-6 p-3 shadow-md border">
              {/* Product Image */}
              <div className="w-full lg:w-1/4">
                <img src={item.product.product_image} alt={item.product.name} className="w-full h-32 object-cover rounded-lg shadow-sm" />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{item.product.name}</CardTitle>
                  <p className="text-gray-600 text-lg">Price: Rs. {item.product.selling_price}</p>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  {/* Quantity Input */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium">Quantity:</span>
                    <Input
                      type="number"
                      value={quantity[item.id] || 1}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="w-20"
                      min="1"
                      max={item.product.quantity}
                    />
                    <Button size="sm" onClick={() => handleUpdateCart(item.id, item.product.id)} className="bg-blue-500 hover:bg-blue-700 text-white">
                      Update
                    </Button>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="flex items-center gap-3">
                    <Checkbox id={`select-${item.id}`} checked={selectedItems[item.id]} onCheckedChange={() => toggleSelection(item.id, item.product.id)} />
                    <label htmlFor={`select-${item.id}`} className="cursor-pointer text-gray-700">
                      {selectedItems[item.id] ? "Deselect" : "Select"}
                    </label>
                  </div>

                  {/* Remove Button */}
                  <Button onClick={() => handleRemoveFromCart(item.id)} variant="destructive" className="w-full lg:w-auto">
                    Remove
                  </Button>

                  {/* Total Cost */}
                  <p className="text-lg font-semibold text-gray-800">Total Cost: Rs. {item.total_cost}</p>
                </CardContent>

              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-700">Your cart is empty.</p>
      )}

      {/* Total Cart Amount */}
      {totalCartAmounts && !loading && totalCartAmounts.total_cost ? (
        <div className="mt-6 text-center text-lg font-semibold text-gray-900">
          🏷️ Total Amount: Rs. <span className="text-blue-600">{totalCartAmounts.total_cost}</span>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-700 mt-6">Total Amount: Null</p>
      )}


    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-4 border-t flex justify-between px-6 items-center">
        <p className="text-xl font-semibold">Total: ${totalCartAmounts?.total_cost || "0.00"}</p>
        <button className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700">
          Make Payment
        </button>
      </div>

    </div>
  );
};

export default CartPage;
