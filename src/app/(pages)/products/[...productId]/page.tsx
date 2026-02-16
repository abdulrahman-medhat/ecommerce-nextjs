import { Params } from "next/dist/server/request/params";
import React from "react";
import { Product } from "../../../../../Interfaces/productInterfaces";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import Image from "next/image";
import { Star, StarHalf, Heart } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

import Autoplay from "embla-carousel-autoplay";
import Slider from "../../../component/Slider/Slider";
import AddToCart from "../../../component/AddToCart/AddToCart";
import { formatCurrency } from "../../../../Helpers/formatCurrency";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId,
  );

  const { data: Product }: { data: Product } = await response.json();

  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 items-center">
      <div>
       <Slider images={Product.images} title={Product.title} />
      </div>

      <div className="p-4 col-span-2 space-y-5">
        <CardHeader>
          <CardDescription className="line-clamp-1">
            {Product.brand.name}
          </CardDescription>
          <CardTitle>{Product.title}</CardTitle>
          <CardAction>{Product.category.name}</CardAction>
          <CardDescription>{Product.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex gap-2">
          <div className="flex">
            <Star className="text-amber-400 fill-amber-500" />
            <Star className="text-amber-400 fill-amber-500" />
            <Star className="text-amber-400 fill-amber-500" />
            <Star className="text-amber-400 fill-amber-500" />
            <StarHalf className="text-amber-400 fill-amber-500" />
          </div>
          <p>{Product.ratingsAverage}</p>
        </CardContent>

        <p>{formatCurrency(Product.price)} </p>

      <AddToCart productId={Product.id} />
      </div>
    </Card>
  );
}
