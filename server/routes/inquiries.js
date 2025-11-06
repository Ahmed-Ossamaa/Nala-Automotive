const express = require('express');
const router = express.Router();
const {protect, isAdmin } = require('../middleWare/authMW');
const inqController = require('../controllers/InquiryController');
const validate = require('../middleWare/validation');
const { createInquirySchema, updateInquirySchema } = require('../validation/inquiryValidator');


router.use(protect);
// Customer routes
router.post('/', validate(createInquirySchema), inqController.createInquiry);
router.get('/my-inquiries' , inqController.getMyInquiries);

// Admin routes
router.use(isAdmin);
router.get('/admin/all', inqController.getAllInquiries);
router.get('/admin/stats', inqController.getInquiryStats);
router.get('/admin/:id', inqController.getInquiryById);
router.patch('/admin/:id', validate(updateInquirySchema), inqController.updateInquiryStatus);
router.delete('/admin/:id', inqController.deleteInquiry);

module.exports = router;