const Inquiry = require('../models/Inquiry');
const BaseService = require('./baseService');
const carService = require('./CarService');

class InquiryService extends BaseService {
  constructor() {
    super(Inquiry);
  }

  // Create new inquiry
  async createInquiry(customerId, customerData, inquiryData) {
    const { carId, message, phone } = inquiryData;

    // Verify car exists and is available
    const car = await carService.findOne({ _id: carId, status: 'available' });
    
    if (!car) {
      throw new Error('Car not found or not available');
    }

    // Create inquiry
    const inquiry = await this.create({
      customer: customerId,
      car: carId,
      message,
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: phone || customerData.phone
    });

    // Populate car details
    return await inquiry.populate('car', 'brand model year thumbnail');
  }

  // Get customer's inquiries
  async getCustomerInquiries(customerId) {
    const inquiries = await Inquiry.find({ customer: customerId })
      .populate('car', 'brand model year thumbnail price status')
      .sort('-createdAt');

    return inquiries;
  }

  // Admin: Get all inquiries with filters
  async getAllInquiries(filters = {}) {
    const query = {};
    if (filters.status) {
      query.status = filters.status;
    }

    const inquiries = await Inquiry.find(query)
      .populate('customer', 'name email phone')
      .populate('car', 'brand model year thumbnail price')
      .sort('-createdAt');

    return inquiries;
  }

  // Admin: Get inquiry by ID
  async getInquiryById(inquiryId) {
    const inquiry = await Inquiry.findById(inquiryId)
      .populate('customer', 'name email phone createdAt')
      .populate('car', 'brand model year thumbnail price mileage');

    if (!inquiry) {
      throw new Error('Inquiry not found');
    }

    return inquiry;
  }

  // Admin: Update inquiry status
  async updateInquiryStatus(inquiryId, updateData) {
    const inquiry = await this.findById(inquiryId);

    if (!inquiry) {
      throw new Error('Inquiry not found');
    }

    const { status, adminNotes } = updateData;

    if (status) {
      inquiry.status = status;
      if (status === 'contacted' && !inquiry.respondedAt) {
        inquiry.respondedAt = Date.now();
      }
    }

    if (adminNotes !== undefined) {
      inquiry.adminNotes = adminNotes;
    }

    await inquiry.save();

    await inquiry.populate('customer', 'name email phone');
    await inquiry.populate('car', 'brand model year thumbnail price');

    return inquiry;
  }

  // Admin: Get inquiry statistics
  async getStatistics() {
    const [
      totalInquiries,
      newInquiries,
      contactedInquiries,
      closedInquiries
    ] = await Promise.all([
      this.count(),
      this.count({ status: 'new' }),
      this.count({ status: 'contacted' }),
      this.count({ status: 'closed' })
    ]);

    // Get most inquired cars
    const mostInquiredCars = await Inquiry.aggregate([
      {
        $group: {
          _id: '$car',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Populate car details
    const Car = require('../models/Car');
    await Car.populate(mostInquiredCars, { 
      path: '_id', 
      select: 'brand model year thumbnail' 
    });

    return {
      total: totalInquiries,
      new: newInquiries,
      contacted: contactedInquiries,
      closed: closedInquiries,
      mostInquiredCars: mostInquiredCars.map(item => ({
        car: item._id,
        inquiryCount: item.count
      }))
    };
  }
}

module.exports = new InquiryService();