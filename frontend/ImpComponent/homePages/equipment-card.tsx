import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface EquipmentCardProps {
  name: string
  image: string
  price: number
  availability: string
}

export default function EquipmentCard({ name, image, price, availability }: EquipmentCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-lg">
            ${price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ day</span>
          </p>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{availability}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <Calendar className="mr-2 h-4 w-4" /> Book Equipment
        </Button>
      </CardFooter>
    </Card>
  )
}
