import mongoose from 'mongoose'
import adminModel from '../models/adminModel.js'
import DoctorModel from '../models/doctorModel.js'
import { getPatients } from './patientController.js'
import { getDoctors } from './doctorController.js'
import packageModel from '../models/packageModel.js'
import PatientModel from '../models/patientModel.js'

/* -----------------admin funcs------------------------ */
const addAdmin = async (req, res) => {
    const fetchedAdmin = await adminModel.find()
    for (let i = 0; i < fetchedAdmin.length; i++)
        if (fetchedAdmin.at(i).Username === req.body.Username) {
            res.status(500).send({ message: 'this username is in use' })
            return
        }
    const newAdmin = new adminModel(req.body)
    newAdmin
        .save()
        .then((result) => res.status(200).send(result))
        .catch((err) =>
            res.status(500).send(err)
        )
}

const getAllAdmins = async (req, res) => {
    adminModel
        .find()
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).res.send(err))
}
/* -----------------admin funcs------------------------ */



/* -----------------user funcs------------------------ */
const getUser = async (req, res) => {
    const { id,type } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({ error: 'invalid id' })

    if (type === 'admin') {
        const ret = await adminModel.findById(id)
        if (ret) {
            res.status(200).json(ret)
        } else {
            res.status(404).send({ error: 'user not found' })
        }
    } else if (type === 'doctor'){
        const ret = await DoctorModel.findById(id)
        if (ret) {
            res.status(200).json(ret)
        } else {
            res.status(404).send({ error: 'user not found' })
        }
    }
    else if (type === 'patient'){
        const ret = await PatientModel.findById(id)
        if (ret) {
            res.status(200).json(ret)
        } else {
            res.status(404).send({ error: 'user not found' })
        }
    }
    else res.status(500).send({ error: 'invalid type of user' })
}

const removeUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({ error: 'invalid id' })

        if (req.body.type === 'admin') {
            const ret = await adminModel.findByIdAndRemove(id)
            if (ret) {
                res.status(200).json(ret)
            } else {
                res.status(404).send({ error: 'user not found' })
            }
        } else if (req.body.type === 'doctor'){
            const ret = await DoctorModel.findByIdAndRemove(id)
            if (ret) {
                res.status(200).json(ret)
            } else {
                res.status(404).send({ error: 'user not found' })
            }
        }
        else if (req.body.type === 'patient'){
            const ret = await PatientModel.findByIdAndDelete(id)
            if (ret) {
                res.status(200).json(ret)
            } else {
                res.status(404).send({ error: 'user not found' })
            }
        }
        else res.status(500).send({ error: 'invalid type of user' })
}
/* -----------------user funcs------------------------ */




/* -----------------Doctor funcs------------------------ */
const getDoctorRequest = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({ error: 'invalid id' })
    try {
        const ret = await DoctorModel.find({ _id: id, status: 'Pending' })
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send({ err: 'database failed' })
    }
}

const getAllDoctorRequest = async (req, res) => {
    try {
        const ret = await DoctorModel.find({ status: 'Pending' })
        res.status(200).send(ret)
    } catch (error) {
        res.status(503).send({ err: 'database failed' })
    }
}

const updateDoctorStatus=async (req,res)=>{
    try {
    const {id} = req.body
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).send({error:"invalid id sent to database"})
        const doctor = await DoctorModel.findById(id)
        if (doctor) {
            await doctor.updateOne({status:req.body.status})
            res.status(200).send("updated")
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getAllDoctors = getDoctors
/* -----------------Doctor funcs------------------------ */



const getAllPatients = getPatients


/* -----------------Package funcs------------------------ */
const getAllPackages = async (req, res) => {
    try {
        const ret = await packageModel.find()
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPackage = async (req, res) => {
    const newPackage = new packageModel(req.body)
    try {
        const ret = await newPackage.save()
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updatePackage = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({error:"invalid id sent to database"})
    const {name, price, sessionDiscount, medicineDiscount, familySubsDiscount} = req.body
    if (!(price > 0 && sessionDiscount > -1 && medicineDiscount > -1 && familySubsDiscount > -1))
        return res.status(404).send({error:"invalid request, all values must be positive"})
    if (!(sessionDiscount < 101 && medicineDiscount < 101 && familySubsDiscount < 101))
        return res.status(400).send({error:"invalid request, all discounts must be less than 100"})
    try {
        const ret = await packageModel.findByIdAndUpdate(id, 
            {name, price, sessionDiscount, medicineDiscount, familySubsDiscount}, {new: true})
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send({error:"database failed"})
    }
}

const getPackagebyID = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({error:"invalid id sent to database"})
    try {
        const ret = await packageModel.findByIdAndUpdate(id)
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send({error:"database failed"})
    }
}

const deletePackage = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({error:"invalid id sent to database"})
    try {
        const ret = await packageModel.findByIdAndRemove(id)
        res.status(200).send(ret)
    } catch (error) {
        res.status(200).send({error:"database failed"})
    }
}
/* -----------------Package funcs------------------------ */


const adminController = {
    addAdmin,
    getUser,
    removeUser,
    getAllAdmins,
    getAllPatients,
    getAllDoctors,
    getAllDoctorRequest,
    getDoctorRequest,
    getAllPackages,
    updatePackage,
    deletePackage,
    addPackage,updateDoctorStatus,getPackagebyID
}
export default adminController
