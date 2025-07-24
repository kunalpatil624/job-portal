import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../components/utills/constand';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../components/redux/companySlice';

const NewCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();
  const param = useParams();
  // ✅ Define function properly (outside try block)
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res?.data?.success) {
         dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        console.log(res);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
        console.log(companyId);
      }
    } catch (error) {
      console.log(error);   
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-5'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500 text-sm'>
            What would you like to give your company name? You can change this later.
          </p>
        </div>
        <div>
          <Label>Company Name</Label>
          <Input
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            className='my-2'
            placeholder='Company Name'
            value={companyName}
          />
        </div>
        <div className='flex items-center gap-5 my-10'>
          <Button variant='outline' onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}> {/* ✅ no () here */}
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewCompany;
