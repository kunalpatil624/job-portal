import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import { useDispatch } from "react-redux";
import searchHandler from "./HeroSection";
import { setSearchQuery } from "./redux/jobSlice";
import { useNavigate } from "react-router-dom";
const categoury = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic designer",
  "MernStack Developer",
];

const CategouryCarousle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchHandler = (query)=> {
      dispatch(setSearchQuery(query))
      navigate("/browes");
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20 grid">
        <CarouselContent className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth ">
          {categoury.map((cat, index) => (
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/3">
              <Button onClick={() => searchHandler(cat)} variant="outline" className="rounded-full"> {cat} </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategouryCarousle;
