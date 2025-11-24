const paymentConfig = {
  // Payment method configuration
  methods: {
    'fnb-eft': {
      name: 'FNB EFT',
      supported: true,
      processingTime: '1-2 business days',
      fee: 0,
      limits: {
        min: 10,
        max: 100000
      }
    },
    'payfast': {
      name: 'PayFast',
      supported: true,
      processingTime: 'Instant',
      fee: 0.03, // 3%
      limits: {
        min: 5,
        max: 100000
      }
    },
    'payshap': {
      name: 'PayShap',
      supported: true,
      processingTime: 'Instant',
      fee: 0.02, // 2%
      limits: {
        min: 1,
        max: 3000
      }
    },
    'paypal': {
      name: 'PayPal',
      supported: true,
      processingTime: 'Instant',
      fee: 0.035, // 3.5%
      limits: {
        min: 1,
        max: 10000
      }
    },
    'stripe': {
      name: 'Stripe',
      supported: true,
      processingTime: 'Instant',
      fee: 0.029, // 2.9% + 30c
      limits: {
        min: 1,
        max: 999999
      }
    }
  },

  // Payout distribution percentages
  payoutSplit: {
    ownerFNB: 0.40,      // 40% to owner FNB
    africanBank: 0.15,   // 15% to African Bank
    reserveFNB: 0.20,    // 20% to reserve FNB
    aiAccount: 0.20,     // 20% to AI account
    remainingFNB: 0.05   // 5% remains in FNB
  },

  // Weekly payout schedule (Cron expression for every Monday at 9 AM)
  payoutSchedule: '0 9 * * 1',

  // Currency configuration
  currency: {
    primary: 'ZAR',
    accepted: ['ZAR', 'USD', 'EUR', 'GBP'],
    exchangeRates: {
      USD: 18.5,
      EUR: 20.1,
      GBP: 23.2
    }
  },

  // Security settings
  security: {
    maxRetries: 3,
    lockoutTime: 900000, // 15 minutes
    webhookVerification: true
  }
};

module.exports = paymentConfig;
