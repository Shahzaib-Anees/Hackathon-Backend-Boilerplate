import { loanModel } from "../models/loan.model.js";
const createLoanRequest = async () => {
    const userID = req.user.id;
    const { category, subCategory, loanPeriod, loanAmount, deposit } = req.body;
    try {
        const loan = await loanModel.create({
            userID,
            category,
            subCategory,
            loanPeriod,
            loanAmount,
            deposit
        })
        return res.status(201).json({ message: "Your loan has been proceed", data: loan })
    } catch (error) {
        return res.status(500).json({ message: "Error occured while requesing loan" })
    }
}

const proceedLoanRequest = async (req, res) => {
    const { loanId, status } = req.body;
    try {
        if (!status) return res.status(400).json({ message: "Status is required" });
        if (status === "completed") {
        }
        const loanData = await loanModel.findByIdAndUpdate(loanId, {
            status: status
        })
        return res.status(200).json({ message: "Status of loan is updated", data: loanData })
    } catch (error) {
        return res.status(500), json({ message: "" })
    }
}


export { createLoanRequest, proceedLoanRequest }