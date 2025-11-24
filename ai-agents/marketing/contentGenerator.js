const axios = require('axios');
const natural = require('natural');
const { OpenAI } = require('openai');

class ContentGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.tokenizer = new natural.WordTokenizer();
  }

  // Generate viral marketing content
  async generateViralContent(topic, targetAudience, platform = 'general') {
    const prompt = this.createViralPrompt(topic, targetAudience, platform);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a viral marketing expert who creates highly engaging, addictive content that gets shared thousands of times."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.8
      });

      const content = response.choices[0].message.content;
      
      // Analyze virality score
      const viralityScore = this.analyzeVirality(content);
      
      return {
        content,
        viralityScore,
        platform,
        targetAudience,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating viral content:', error);
      throw error;
    }
  }

  createViralPrompt(topic, audience, platform) {
    return `Create a highly viral marketing content about "${topic}" for ${audience} to be posted on ${platform}. 
    
    The content must be:
    - Highly engaging and addictive
    - Include emotional triggers (curiosity, fear of missing out, social proof)
    - Have a clear call-to-action
    - Optimized for the specific platform
    - Include trending hashtags if applicable
    - Be educational but entertaining
    
    Make it impossible to scroll past without engaging!`;
  }

  analyzeVirality(content) {
    let score = 0;
    
    // Check for emotional words
    const emotionalWords = ['amazing', 'incredible', 'unbelievable', 'shocking', 'secret', 'free', 'limited', 'urgent'];
    emotionalWords.forEach(word => {
      if (content.toLowerCase().includes(word)) score += 5;
    });

    // Check for questions (engagement)
    const questionCount = (content.match(/\?/g) || []).length;
    score += questionCount * 3;

    // Check for urgency words
    const urgencyWords = ['now', 'today', 'immediately', 'limited time', 'don\'t miss'];
    urgencyWords.forEach(word => {
      if (content.toLowerCase().includes(word)) score += 4;
    });

    // Check length appropriateness
    const wordCount = this.tokenizer.tokenize(content).length;
    if (wordCount >= 50 && wordCount <= 300) score += 10;

    return Math.min(100, score);
  }

  // Generate content for 3000 student target
  async createStudentAcquisitionCampaign() {
    const campaigns = [
      {
        name: "Early Adopter Program",
        content: await this.generateViralContent(
          "Master high-income skills in 2024", 
          "career-changers and students",
          "linkedin"
        )
      },
      {
        name: "Traditional Skills Revival",
        content: await this.generateViralContent(
          "Learn rare traditional trades that pay R50k+ per month",
          "hands-on learners and entrepreneurs",
          "facebook"
        )
      },
      {
        name: "AI Education Revolution",
        content: await this.generateViralContent(
          "How AI is changing education forever",
          "tech enthusiasts and educators",
          "twitter"
        )
      }
    ];

    return campaigns;
  }
}

module.exports = new ContentGenerator();
