import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "./redux/jobSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "MernStack Developer",
  "DevOps Engineer",
  "Android Developer",
  "AI Engineer",
];

const CategouryCarousle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browes");
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto my-10 px-4">
      {/* Mobile/Tablet Scrollable View */}
      <div className="flex md:hidden overflow-x-auto no-scrollbar gap-3 snap-x snap-mandatory scroll-smooth">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => searchHandler(cat)}
            className="shrink-0 snap-start whitespace-nowrap px-4 py-2 border border-gray-300 rounded-full text-sm bg-white"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Desktop Carousel View with Arrows */}
      <div className="hidden md:block mt-8">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="flex">
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-1/4 lg:basis-1/6 px-2"
              >
                <Button
                  onClick={() => searchHandler(cat)}
                  variant="outline"
                  className="w-full rounded-full text-sm transition-all duration-300 hover:bg-purple-100 hover:text-purple-700 font-[Poppins]"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CategouryCarousle;
