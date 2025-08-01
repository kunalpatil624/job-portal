import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './redux/jobSlice';

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
  const dispatch = useDispatch()
  const changeHandler = (value) =>{
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue])
  return (
    <div className='p-3 bg-white rounded-md w-full'>
      <div>
      <h1 className="text-lg font-semibold">Filter Job</h1>
      <hr className='my-3' />
      <RadioGroup value = {selectedValue} onValueChange={changeHandler} defaultValue="comfortable">
        {
          filterData.map((data, index) => (
            <div key={data.filterType}>
              <h1 className="text-md font-medium">{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `${index} - ${idx}`
                  return(
                  <div className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem className=" border-2 border-black text-black focus:ring-0 focus:ring-black hover:cursor-pointer" value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                  )
                })
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
