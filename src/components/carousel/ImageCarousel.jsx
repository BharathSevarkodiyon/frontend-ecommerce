import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageCarousel() {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/7c6cf1a109b087d2.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5cd83a0e505d4445.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e7554fcdb3042316.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/b76bba648130afc4.jpeg?q=20",
  ];

  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full xl:overflow-hidden"
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="w-full h-[166px] xl:h-60 xl:w-screen">
                <Card className="w-full h-full p-0">
                  <CardContent className="w-full h-full p-0">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
