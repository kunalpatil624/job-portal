import React, { useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { Button } from '../components/ui/button'
import { ArrowLeft, Loader2, Store } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../components/utills/constand'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import useGetCompanyById from '../hooks/usegetCompanyById'

export const CompanySetup = () => {
    const param = useParams();
    const companyId = param.id;
    useGetCompanyById(param.id)
    const [input, setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    });
    const {singleCompany} = useSelector(Store => Store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }
    const submitHandler = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input?.file){
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res?.data?.success){
                toast.success(res?.data?.message); 
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);    
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name:singleCompany.name || "",
            description:singleCompany.description || "",
            location:singleCompany.location || "",
            website:singleCompany.website || "",
            file:singleCompany.file || null
        })
    }, [])
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
            <div className='flex items-center gap-5 p-5'>
               <Button onClick={() => navigate("/admin/companies/new")} variant="outline"><span><ArrowLeft/></span>Back</Button>
               <h1 className='font-bold text-xl'>Company Setup</h1>
            </div>
            <div className='p-5 grid grid-cols-2 gap-4'>
                <div>
                <Label >Company Name :- </Label>    
                <Input type="text" placeholder="Copmpany-Name" name="name" value={input.name} onChange={changeEventHandler}></Input>
            </div>
            <div>
                <Label >Description :- </Label>    
                <Input type="text" placeholder="Description" name="description" value={input.description} onChange={changeEventHandler}></Input>
            </div>
            <div>
                <Label >Website :- </Label>    
                <Input type="text" placeholder="Website" name="website" value={input.website} onChange={changeEventHandler}></Input>
            </div>
            <div>
                <Label >Location :- </Label>    
                <Input type="text" placeholder="Location" name="location" value={input.location} onChange={changeEventHandler}></Input>
            </div>
            <div>
                <Label >Company logo :- </Label>    
                <Input type="file" placeholder="logo" accept="image/*" onChange={changeFileHandler}></Input>
            </div>
            </div>
            
             {
                loading ? <Button className="w-full my-10 "><Loader2 className='h-4 w-4 animate-spin'/> Pleas Wait</Button> : <Button className="w-full my-10" type="submit">Update</Button>
             }
        </form>

        </div>
    </div>
  )
}
