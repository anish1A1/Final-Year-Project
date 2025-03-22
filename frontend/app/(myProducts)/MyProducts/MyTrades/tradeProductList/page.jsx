"use client";

import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../../../utils/prod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PackageSearch, HandCoins, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TradeProductList = () => {
  const { fetchTrades, trades, loading, UpdateTradeById, deleteTradeById } = useContext(ProductContext);
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTrades();
    };
    fetchData();
  }, []);

  const handleTradeView = (id) => {
    router.push(`/allTrades/${id}`);
  };

  const deleteTrade = (id) => {
    try {
    const response = deleteTradeById(id);
      toast.success(response.message || "Trade was deleted successfully!");  
    } catch (error) {
        toast.error(error.message || "Error deleting Trade!");
    }    
  }

  const handleUpdateTrade = async () => {
    try {
        console.log(selectedTrade);
       const response = await UpdateTradeById(selectedTrade.id, selectedTrade);
      toast.success(response.message || "Trade updated successfully!");
      setSelectedTrade(null); // Close the modal
    } catch (error) {
      toast.error("Failed to update trade.", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">
        Loading trades...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {trades && trades.length > 0 ? (
          trades.map((trade) => (
            <div
              key={trade.id}
              className="bg-white shadow-xl rounded-xl p-6 transition-all transform hover:shadow-2xl border border-gray-200"
            >
              {trade.product.product_image && (
                <img
                  src={trade.product.product_image}
                  alt={trade.product.name}
                  className="cursor-pointer w-full h-52 object-cover rounded-lg mb-4"
                  onClick={() => handleTradeView(trade.id)}
                />
              )}

              <Badge className="absolute top-4 left-4 hover:text-blue-200 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-md shadow-md">
                {trade.product.category.name}
              </Badge>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {trade.product.name}
              </h2>

              <div className="mt-3 space-y-2">
                <p className="text-gray-700 flex items-center gap-2">
                  <PackageSearch size={20} />
                  Wanted Product:{" "}
                  <span className="font-semibold">{trade.wanted_product}</span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <HandCoins size={20} />
                  Wanted Quantity:{" "}
                  <span className="font-semibold">{trade.wanted_quantity} unit</span>
                </p>
              </div>

              <div className="mt-4 border-t pt-3 flex space-x-1 items-center text-gray-700 text-sm">
                <Clock className="w-4 h-4 text-yellow-600" />
                <p className="flex items-center font-semibold text-gray-700">
                  End Date:
                  <span className="pl-2">
                    {new Date() > new Date(trade.trade_ending_date) ? (
                        <span className="text-red-600 font-semibold">This Trade has Expired</span>
                    ) : (
                        <span className="text-gray-700">
                        {new Date(trade.trade_ending_date).toLocaleDateString()}
                        </span>
                    )}
                    </span>

                </p>
              </div>

              <div className="flex justify-between mt-5">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                      onClick={() => setSelectedTrade(trade)}
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-6">
                    <DialogHeader>
                      <DialogTitle>Update Trade</DialogTitle>
                      <DialogDescription>
                        Modify the trade details below and click "Submit" to save changes.
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Wanted Product</label>
                        <Input
                          type="text"
                          value={selectedTrade?.wanted_product || ""}
                          onChange={(e) =>
                            setSelectedTrade((prev) => ({
                              ...prev,
                              wanted_product: e.target.value,
                            }))
                          }
                          className="w-full border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Wanted Quantity</label>
                        <Input
                          type="number"
                          value={selectedTrade?.wanted_quantity || ""}
                          onChange={(e) =>
                            setSelectedTrade((prev) => ({
                              ...prev,
                              wanted_quantity: e.target.value,
                            }))
                          }
                          className="w-full border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Ending Date</label>
                        <Input
                          type="date"
                          value={
                            selectedTrade?.trade_ending_date
                              ? new Date(selectedTrade.trade_ending_date).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setSelectedTrade((prev) => ({
                              ...prev,
                              trade_ending_date: e.target.value,
                            }))
                          }
                          className="w-full border-gray-300 rounded-lg"
                        />
                      </div>
                      <Button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition"
                        onClick={handleUpdateTrade}
                      >
                        Submit
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
                  onClick={() => deleteTrade(trade.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-3">No trades available.</p>
        )}
      </div>
    </div>
  );
};

export default TradeProductList;
