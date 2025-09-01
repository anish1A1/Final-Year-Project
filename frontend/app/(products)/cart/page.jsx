"use client";

import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../../utils/cart";
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { AuthContext } from "../../../utils/auth";
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
  } = useContext(CartContext);
  const {user} = useContext(AuthContext);

  const [quantity, setQuantity] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchCart();
    fetchtotalCartAmount();
  }, [user]);

  useEffect(() => {
    const initialQuantities = {};
    const initialSelections = {};
    cartItem?.forEach((item) => {
      initialQuantities[item.id] = item.product_qty;
      initialSelections[item.id] = item.is_selected;
    });
    setQuantity(initialQuantities);
    setSelectedItems(initialSelections);
  }, [cartItem]);

  const groupedCart = cartItem?.reduce((acc, item) => {
    const owner = item.product.product_owner;
    acc[owner] = acc[owner] || [];
    acc[owner].push(item);
    return acc;
  }, {});

  const handleQuantityChange = (id, qty) => setQuantity({ ...quantity, [id]: qty });

  const handleUpdateCart = async (id, product_id) => {
    try {
      await updateCart(id, quantity[id], product_id, selectedItems[id]);
      await fetchtotalCartAmount();
      toast.success("Cart updated successfully");
    } catch (error) {
        toast.error(error.product_qty ? error.product_qty[0] : "Error updating quantity in cart.");
    //   toast.error("Error updating cart");
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id);
      await fetchtotalCartAmount();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Error removing item from cart");
    }
  };

  const toggleSelection = async (id, product_id) => {
    const newSelection = { ...selectedItems, [id]: !selectedItems[id] };
    setSelectedItems(newSelection);
    try {
      await updateCartProductSelection(id, newSelection[id], product_id);
      await fetchtotalCartAmount();
      toast.success("Selection updated");
    } catch (error) {
      toast.error("Error selecting product");
    }
  };

  const handleCheckout = () => {
    const selectedCartIds = Object.keys(selectedItems).filter((id) => selectedItems[id]);
  
    if (selectedCartIds.length === 0) {
      toast.error("Please select at least one item to proceed to checkout.");
      return;
    }
  
    const queryString = selectedCartIds.map((id) => `id=${id}`).join("&");
    router.push(`/cart/makePayment?${queryString}`);
  };
  
    

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-500" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 p-8 bg-gray-50 rounded-lg shadow-xl">
      <BreadCrumbs />
      <h1 className="text-4xl font-bold text-center mb-6">🛒 Your Shopping Cart</h1>
      {cartItem?.length ? (
        <div className="grid gap-4">
          {Object.entries(groupedCart || {}).map(([owner, items]) => (
            <div key={owner} className="bg-white p-4 rounded-lg shadow-lg border">
              <h2 className="text-2xl font-semibold border-b pb-2 mb-4">👤 Sold by: {owner}</h2>
              {items.map((item) => (
                <Card key={item.id} className="flex flex-col lg:flex-row gap-4 p-2 shadow-md border mb-3">
                  <div className="w-full lg:w-1/4">
                    <img src={item.product.product_image} alt={item.product.name} className="w-full h-32 object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{item.product.name}</CardTitle>
                      <p className="text-gray-600 text-lg">Price: Rs. {item.product.selling_price}</p>
                      <p className="text-gray-500 text-sm">Delivery Charge: Rs. {item.product.delivery_sell_charge}</p>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <Input
                          type="number"
                          value={quantity[item.id] || 1}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                          className="w-20"
                          min="1"
                          max={item.product.quantity}
                        />
                        <Button size="sm" onClick={() => handleUpdateCart(item.id, item.product.id)} className="bg-blue-500 text-white">
                          Update
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox id={`select-${item.id}`} checked={selectedItems[item.id]} onCheckedChange={() => toggleSelection(item.id, item.product.id)} />
                        <label htmlFor={`select-${item.id}`} className="cursor-pointer">{selectedItems[item.id] ? "Deselect" : "Select"}</label>
                      </div>
                      <Button onClick={() => handleRemoveFromCart(item.id)} variant="destructive" className="w-full lg:w-auto">
                        Remove
                      </Button>
                      <p className="text-lg font-semibold">Total Cost: Rs. {item.total_cost}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg py-20 pb-28">Your cart is empty.</p>
      )}
      {cartItem?.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-4 border-t flex justify-between px-12 lg:pl-20 items-center">
            <p className="text-xl font-semibold">Total Amount: Rs. {totalCartAmounts.total_cost}</p>
            <Button className="bg-green-500 text-white" onClick={() => handleCheckout()}>
            Checkout
            </Button>
        </div>
    )}

    </div>
  );
};

export default CartPage;
