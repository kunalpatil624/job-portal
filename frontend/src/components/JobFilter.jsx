import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import { Button } from './ui/button';

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Indore", "Pune", "Hyderabad", "Bangalore", "Delhi"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "MernStack Developer", "Data Science", "Ai/Ml", "Graphic Designe"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-3lakh", "3lakh-6lakh"]
  }
]

const JobFilter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const changeHandler = (value) =>{
    setSelectedValue(value)
  }

  useEffect(() => {
    console.log(selectedValue)
  }, [selectedValue])
  return (
    <div className='hidden md:flex p-3 bg-white rounded-md w-full'>
      <div>
      <h1 className="text-lg font-semibold">Filter Job</h1>
      <hr className='my-3' />
      <RadioGroup value = {selectedValue} onValueChange={changeHandler} defaultValue="comfortable">
        {
          filterData.map((data) => (
            <div key={data.filterType}>
              <h1 className="text-md font-medium">{data.filterType}</h1>
              {
                data.array.map((item) => (
                  <div key={`${data.filterType}-${item}`} className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={item} id={`${data.filterType}-${item}`} />
                    <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
      </div>

      {/* <Sheet className="">
        <SheetTrigger asChild>
          <Button variant="outline">Filter Job</Button>
        </SheetTrigger>
      </Sheet> */}
    </div>
    
  )
}

export default JobFilter
