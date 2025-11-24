const aiConfig = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    timeout: 30000
  },

  // Hugging Face Configuration
  huggingface: {
    token: process.env.HUGGINGFACE_TOKEN,
    models: {
      sentiment: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
      summarization: 'facebook/bart-large-cnn'
    }
  },

  // Marketing AI Agents
  marketing: {
    contentGeneration: {
      enabled: true,
      dailyLimit: 50,
      platforms: ['twitter', 'linkedin', 'facebook', 'instagram'],
      tone: 'professional',
      targetAudiences: [
        'career-changers',
        'students',
        'entrepreneurs',
        'retirees',
        'traditional-crafts-enthusiasts'
      ]
    },
    viralCampaign: {
      enabled: true,
      minViralityScore: 75,
      maxPostsPerDay: 10,
      engagementThreshold: 100
    },
    targeting: {
      enabled: true,
      maxTargets: 5000,
      retargetingDays: 30,
      lookalikeExpansion: true
    }
  },

  // Recommendation Engine
  recommendation: {
    enabled: true,
    algorithm: 'hybrid',
    factors: {
      similarity: 0.4,
      popularity: 0.3,
      personalization: 0.3
    },
    maxRecommendations: 10,
    minConfidence: 0.6
  },

  // Analytics AI
  analytics: {
    trendPrediction: {
      enabled: true,
      horizon: 30, // days
      confidenceThreshold: 0.7
    },
    studentSuccess: {
      enabled: true,
      atRiskThreshold: 0.3,
      interventionTriggers: ['low_engagement', 'falling_behind', 'low_scores']
    }
  },

  // Performance Monitoring
  monitoring: {
    enabled: true,
    logLevel: 'info',
    performanceThreshold: 2000, // ms
    errorRateThreshold: 0.05 // 5%
  }
};

module.exports = aiConfig;
