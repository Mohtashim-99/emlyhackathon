import { Button } from "@remis/ares/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@remis/ares/components/carousel";

export function About() {
  return (
    <main className="p-10 space-y-8">
      <h1>About Page</h1>

      <Button>Click me</Button>

      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          <CarouselItem className="bg-secondary rounded-md h-40 flex items-center justify-center">
            Slide 1
          </CarouselItem>
          <CarouselItem className="bg-secondary rounded-md h-40 flex items-center justify-center">
            Slide 2
          </CarouselItem>
          <CarouselItem className="bg-secondary rounded-md h-40 flex items-center justify-center">
            Slide 3
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}