const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const inquiryService = require('../services/InquiryService');

class InquiryController {
    // Create new inquiry 
    createInquiry = asyncHandler(async (req, res) => {
        const inquiry = await inquiryService.createInquiry(
            req.user._id,
            req.user,
            req.body
        );

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: { inquiry },
        });
    });

    // Get customer's inquiries
    getMyInquiries = asyncHandler(async (req, res) => {
        const inquiries = await inquiryService.getCustomerInquiries(req.user._id);
        console.log('Cookies:', req.cookies);
        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: { inquiries },
        });
    });

    // Get all inquiries (Admin)
    getAllInquiries = asyncHandler(async (req, res) => {
        const inquiries = await inquiryService.getAllInquiries(req.query);

        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: { inquiries },
        });
    });

    // Get single inquiry (Admin)
    getInquiryById = asyncHandler(async (req, res) => {
        const inquiry = await inquiryService.getInquiryById(req.params.id);

        if (!inquiry) throw ApiError.notFound('Inquiry not found');

        res.status(200).json({
            success: true,
            data: { inquiry },
        });
    });

    // Update inquiry status (Admin)
    updateInquiryStatus = asyncHandler(async (req, res) => {
        const inquiry = await inquiryService.updateInquiryStatus(req.params.id, req.body);

        if (!inquiry) throw ApiError.notFound('Inquiry not found');

        res.status(200).json({
            success: true,
            message: 'Inquiry updated successfully',
            data: { inquiry },
        });
    });

    // Delete inquiry (Admin)
    deleteInquiry = asyncHandler(async (req, res) => {
        const inquiry = await inquiryService.findById(req.params.id);
        if (!inquiry) throw ApiError.notFound('Inquiry not found');

        await inquiryService.deleteById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Inquiry deleted successfully',
        });
    });

    // Get inquiry statistics (Admin)
    getInquiryStats = asyncHandler(async (req, res) => {
        const stats = await inquiryService.getStatistics();

        res.status(200).json({
            success: true,
            data: stats,
        });
    });
}

module.exports = new InquiryController();
