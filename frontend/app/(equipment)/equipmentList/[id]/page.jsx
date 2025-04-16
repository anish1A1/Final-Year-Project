'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { EquipmentContext } from '../../../../utils/equip';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import BreadCrumbs from "@/Impcomponent/BreadCrumbs";
import { AuthContext } from '../../../../utils/auth';

const EquipmentDetail = () => {
  const [equipment, setEquipment] = useState(null);
  const { getEquipmentById, fetchEquipmentBookings, equipmentBooks } = useContext(EquipmentContext);
  const router = useRouter();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
    const [userBookings, setUserBookings] = useState([]);
  

    if (!user) {
      router.push('/login');
      toast.info("Please login to access Equipment Pages!");
    }
    
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await getEquipmentById(id);
          setEquipment(data);
          await fetchEquipmentBookings();
        } catch (error) {
          console.error('Error fetching equipment details:', error);
          toast.error('Error fetching equipment details');
        }
      };
      fetchData();
    }
  }, [id]);

  

  

   useEffect(() => {
      if (Array.isArray(equipmentBooks) && equipmentBooks.length > 0 && user) {
        const bookings = equipmentBooks.filter((booking) => booking.user === user.username);
        setUserBookings(bookings);
      }
    }, [equipmentBooks, user]);

  const handleCreateBooking = (id) => {
      if (!user) {
          toast.error("You need to be logged in to create a booking.");
          return;
      }
      router.push(`/createBooking/${id}`);
    };
  
    const isAlreadyBooked = (equipmentId) => {
      return userBookings.some((booking) => booking.equipment === equipmentId);
    };


  if (!equipment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-96 h-64 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-24">
      {/* Breadcrumbs with proper spacing */}
      <div className="max-w-6xl mx-auto mb-4">
        <BreadCrumbs />
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 shadow-lg rounded-xl">
        {/* Left Section - Image & Messages */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <img src={equipment.image} alt={equipment.name} className="w-full h-96 object-cover rounded-lg" />
          <div className="p-4 bg-gray-200 rounded-lg">
            <p className="font-semibold">Quick Message</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-300 px-3 py-1 rounded-lg">Hello, You can quick message here.</span>
              <span className="bg-gray-300 px-3 py-1 rounded-lg">Hello, Thank You.</span>
            </div>
            <input type="text" placeholder="Message..." className="w-full mt-2 p-2 border rounded-lg" />
          </div>
        </motion.div>

        {/* Right Section - Equipment Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
          <p className="text-gray-600">{equipment.description}</p>
          <p className="text-lg font-semibold">Per Day Rate: <span className="text-green-600">{equipment.per_day_rate} NPR</span></p>
          <p className="text-lg font-semibold">Delivery Charge: <span className="text-blue-600">{equipment.delivery_charge} NPR</span></p>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Availability:</span>
            {equipment.availability_status ? (
              <Badge className="bg-green-500 text-white">Available</Badge>
            ) : (
              <Badge className="bg-red-500 text-white">Not Available</Badge>
            )}
          </div>
          <p className="text-gray-700">Owner: {equipment.user}</p>
          
          {equipment.user_manual && (
            <a href={equipment.user_manual} download className="flex items-center space-x-2 text-blue-600 hover:underline">
              <Download className="w-4 h-4" />
              <span>Download User Manual</span>
            </a>
          )}

          {/* <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
            Rent Product
          </Button> */}
          {user && equipment.user !== user.username && (
                            isAlreadyBooked(equipment.id) ? (
                              <Button variant="outline" className="w-full" disabled>Already Booked</Button>
                            ) : (
                              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => handleCreateBooking(equipment.id)}>Create Booking</Button>
                            )
                          )}

          <Button variant="outline" onClick={() => router.back()} className="flex items-center space-x-2 w-full">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Equipment List</span>
          </Button>
        </motion.div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <h2 className="text-lg font-semibold mb-2">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
