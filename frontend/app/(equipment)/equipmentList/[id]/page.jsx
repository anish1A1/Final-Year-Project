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

const EquipmentDetail = () => {
  const [equipment, setEquipment] = useState(null);
  const { getEquipmentById } = useContext(EquipmentContext);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await getEquipmentById(id);
          setEquipment(data);
        } catch (error) {
          console.error('Error fetching equipment details:', error);
          toast.error('Error fetching equipment details');
        }
      };
      fetchData();
    }
  }, [id]);

  if (!equipment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-96 h-64 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          {equipment.image && (
            <img src={equipment.image} alt={equipment.name} className="w-full h-64 object-cover" />
          )}
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">{equipment.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <Button variant="outline" onClick={() => router.back()} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Equipment List</span>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EquipmentDetail;
