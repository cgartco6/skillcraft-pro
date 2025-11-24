const Payment = require('../models/Payment');
const User = require('../models/User');
const { processPaymentSplit } = require('../utils/paymentSplit');
const { generateInvoice } = require('../utils/documentGenerator');

class PaymentController {
  // Process payment with multiple South African methods
  async processPayment(req, res) {
    try {
      const { userId, courseIds, paymentMethod, amount } = req.body;
      
      // Validate payment method
      const validMethods = ['fnb-eft', 'payfast', 'payshap', 'paypal', 'stripe'];
      if (!validMethods.includes(paymentMethod)) {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      // Create payment record
      const payment = new Payment({
        userId,
        courseIds,
        paymentMethod,
        amount,
        status: 'pending'
      });

      await payment.save();

      // Process payment based on method
      let paymentResult;
      switch(paymentMethod) {
        case 'fnb-eft':
          paymentResult = await this.processFNBPayment(payment);
          break;
        case 'payfast':
          paymentResult = await this.processPayFastPayment(payment);
          break;
        case 'payshap':
          paymentResult = await this.processPayShapPayment(payment);
          break;
        default:
          paymentResult = await this.processInternationalPayment(payment);
      }

      if (paymentResult.success) {
        // Update payment status
        payment.status = 'completed';
        await payment.save();

        // Process payment split
        await processPaymentSplit(payment.amount, payment._id);

        // Generate invoice
        const invoice = await generateInvoice(payment);

        res.json({
          success: true,
          paymentId: payment._id,
          invoiceUrl: invoice.url,
          message: 'Payment processed successfully'
        });
      } else {
        throw new Error(paymentResult.error);
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // FNB EFT Payment processing
  async processFNBPayment(payment) {
    // Implement FNB EFT integration
    return { success: true, reference: `FNB${Date.now()}` };
  }

  // PayFast integration
  async processPayFastPayment(payment) {
    // Implement PayFast integration
    const PayFast = require('payfast');
    const payfast = new PayFast({
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      passphrase: process.env.PAYFAST_PASSPHRASE
    });

    return await payfast.payment.create(payment);
  }

  // Weekly payout system
  async processWeeklyPayouts(req, res) {
    try {
      const { startDate, endDate } = req.body;
      
      // Get all completed payments for the week
      const payments = await Payment.find({
        status: 'completed',
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      });

      const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
      
      // Process payout split
      const payout = await processPaymentSplit(totalRevenue, 'weekly-payout');

      res.json({
        success: true,
        totalRevenue,
        payoutBreakdown: payout,
        message: 'Weekly payouts processed successfully'
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PaymentController();
