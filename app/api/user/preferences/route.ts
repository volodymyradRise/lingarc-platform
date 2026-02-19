// app/api/user/preferences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { SupportedLanguage, CEFRLevel } from '@/lib/i18n/types';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, showExplanations, immersionMode, userLevel } = body;

    const response = {
      success: true,
      preferences: {
        language: language as SupportedLanguage,
        showExplanations: showExplanations as boolean,
        immersionMode: immersionMode as boolean,
        userLevel: userLevel as CEFRLevel
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API] Failed to update preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const preferences = {
      language: 'en' as SupportedLanguage,
      showExplanations: true,
      immersionMode: false,
      userLevel: 'A1' as CEFRLevel
    };

    return NextResponse.json({ success: true, preferences });
  } catch (error) {
    console.error('[API] Failed to fetch preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}
