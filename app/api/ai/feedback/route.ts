// app/api/ai/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { SupportedLanguage } from '@/lib/i18n/types';

interface FeedbackRequest {
  userText: string;
  nativeLanguage: SupportedLanguage;
  taskType: 'writing' | 'speaking' | 'grammar';
  context?: string;
}

interface FeedbackResponse {
  correct: boolean;
  feedback: string;
  correctAnswer: string;
  explanation: string;
}

const FALLBACK_FEEDBACK: Record<SupportedLanguage, string> = {
  en: "We couldn't process your answer right now. Please try again.",
  uk: "Ми не змогли обробити вашу відповідь. Спробуйте ще раз.",
  ru: "Мы не смогли обработать ваш ответ. Попробуйте еще раз.",
  es: "No pudimos procesar tu respuesta. Inténtalo de nuevo."
};

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    const { userText, nativeLanguage } = body;

    if (!userText || userText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'User text is required' },
        { status: 400 }
      );
    }

    const mockResponse: FeedbackResponse = {
      correct: true,
      feedback: FALLBACK_FEEDBACK[nativeLanguage],
      correctAnswer: userText,
      explanation: "This is a demo response. In production, this would be AI-generated feedback."
    };

    return NextResponse.json({ success: true, feedback: mockResponse });
  } catch (error) {
    console.error('[AI] Feedback generation failed:', error);
    
    return NextResponse.json({
      success: false,
      feedback: {
        correct: false,
        feedback: FALLBACK_FEEDBACK['en'],
        correctAnswer: '',
        explanation: ''
      }
    });
  }
}
