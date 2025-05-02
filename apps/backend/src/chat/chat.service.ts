import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = "AIzaSyBlXBeyFp8n5rkd10_cSl5wzRJ3JscrSiM";
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async getChatResponse(userMessage: string): Promise<string> {
    try {
      const base64Message = Buffer.from(userMessage).toString('base64');

      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      const result = await model.generateContent([
        {
          inlineData: {
            data: base64Message,
            mimeType: 'text/plain',
          },
        },
        'Generate a response',
      ]);

      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate chat response');
    }
  }
}
