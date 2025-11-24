const TaxRecord = require('../models/TaxRecord');

class SARSCompliance {
  constructor() {
    this.taxFreeThreshold = 91250; // 2024 tax-free threshold for individuals
    this.taxFreeAge = 62; // Age for additional tax benefits
  }

  // Track and remind about tax obligations
  async trackTaxObligations(userId, financialYear = '2024') {
    const user = await User.findById(userId);
    const payments = await Payment.find({
      userId,
      status: 'completed',
      createdAt: {
        $gte: new Date(`${financialYear}-03-01`),
        $lte: new Date(`${parseInt(financialYear)+1}-02-28`)
      }
    });

    const totalIncome = payments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Check if user qualifies for age-based tax benefits
    const qualifiesForAgeBenefit = this.calculateAge(user.dateOfBirth) >= this.taxFreeAge;
    
    const taxObligation = this.calculateTax(totalIncome, qualifiesForAgeBenefit);
    
    // Create tax record
    const taxRecord = new TaxRecord({
      userId,
      financialYear,
      totalIncome,
      taxObligation,
      qualifiesForAgeBenefit,
      reminders: this.generateTaxReminders(taxObligation, qualifiesForAgeBenefit)
    });

    await taxRecord.save();
    
    return taxRecord;
  }

  calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  calculateTax(income, ageBenefit = false) {
    let taxableIncome = income;
    
    // Apply tax-free threshold
    if (ageBenefit) {
      taxableIncome = Math.max(0, income - (this.taxFreeThreshold * 1.5)); // Higher threshold for 65+
    } else {
      taxableIncome = Math.max(0, income - this.taxFreeThreshold);
    }

    // Progressive tax calculation (simplified)
    if (taxableIncome <= 216200) return taxableIncome * 0.18;
    if (taxableIncome <= 337800) return 38916 + (taxableIncome - 216200) * 0.26;
    if (taxableIncome <= 467500) return 70532 + (taxableIncome - 337800) * 0.31;
    if (taxableIncome <= 613600) return 110739 + (taxableIncome - 467500) * 0.36;
    return 163335 + (taxableIncome - 613600) * 0.39;
  }

  generateTaxReminders(taxObligation, ageBenefit) {
    const reminders = [];
    const currentDate = new Date();
    
    if (taxObligation > 0) {
      reminders.push({
        type: 'tax_payment_due',
        message: `Tax obligation of R${taxObligation.toFixed(2)} due for payment`,
        dueDate: new Date(currentDate.getFullYear(), 8, 30), // September 30
        priority: 'high'
      });
    }

    if (ageBenefit) {
      reminders.push({
        type: 'age_benefit_available',
        message: 'You qualify for additional tax benefits as a senior citizen',
        dueDate: null,
        priority: 'info'
      });
    }

    return reminders;
  }

  // Generate SARS-compliant documents
  async generateTaxDocuments(userId, financialYear) {
    const taxRecord = await this.trackTaxObligations(userId, financialYear);
    
    return {
      itr12: this.generateITR12(taxRecord),
      proofOfIncome: this.generateProofOfIncome(taxRecord),
      taxCertificate: this.generateTaxCertificate(taxRecord)
    };
  }

  generateITR12(taxRecord) {
    // Generate ITR12 form data
    return {
      form: 'ITR12',
      financialYear: taxRecord.financialYear,
      totalIncome: taxRecord.totalIncome,
      taxObligation: taxRecord.taxObligation,
      ageBenefit: taxRecord.qualifiesForAgeBenefit,
      timestamp: new Date()
    };
  }
}

module.exports = new SARSCompliance();
