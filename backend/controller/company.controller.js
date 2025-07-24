import cloudinary from "../config/cloudinary.js";
import {Company} from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js"

export const CompanyRegister = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async(req, res) =>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found.",
                success:false
            });
        ;}
        return res.status(200).json({
            message:"company found successfully.",
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

//get company by id
export const getCompanyById = async(req, res) =>{
    try {
        const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if(!company){
        return res.status(404).json({
                message:"Company not found.",
                success:false
            });
    };

    return res.status(200).json({
        message:"company find successfully",
        company,
        success:true
    });
    } catch (error) {
        console.log(error);
    };
};

export const companyUpdate = async(req, res) =>{
     try {
        const {name, description,website, location} = req.body;
        console.log(name, description,website, location);
        const file = req.file;
        //cloud ayga idhar
        let logo;
        if (file) {
         const fileUri = getDataUri(file);
         const cloudResponse = await cloudinary.uploader.upload(
           fileUri.content
         );
          logo = cloudResponse.secure_url;
       }

        const existing = await Company.findOne({ name, _id: { $ne: req.params.id } });
        if (existing) {
              return res.status(400).json({
                success: false,
                message: "Company name already exists. Please choose another name.",
          });
         }


        const updateData = {name, description,website, location, logo};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(400).json({
                message:"company not found.",
                success:false
            });
        };

        return res.status(200).json({
            message:"Company information updated.",
            // company,
            success:true
        });

     } catch (error) {
        console.log(error);
     }
}
