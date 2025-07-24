import React from 'react'
import Navbar from '../components/shared/Navbar'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '../hooks/useGetAllCompany'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../components/redux/companySlice'

export const Companies = () => {
  useGetAllCompany()
    const navigate =useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setSearchCompanyByText(input));
    }, [input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex justify-between items-center my-5'>
                <Input onChange={(e) => setInput(e.target.value)} className="w-fit" placeholder="Filter by name"></Input>
                <Button onClick={() => navigate("/admin/companies/new")}>New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}
