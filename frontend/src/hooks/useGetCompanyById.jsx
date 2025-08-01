import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../components/redux/companySlice';
import { COMPANY_API_END_POINT } from '../components/utills/constand';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error fetching company:", error);
      }
    };

    if (companyId) {
      fetchCompany();
    }
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
