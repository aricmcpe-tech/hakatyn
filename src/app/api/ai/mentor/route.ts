import { NextRequest, NextResponse } from 'next/server';
import { askAIMentor } from '../../../../lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, mode, lang, projectContext } = body;

    const result = await askAIMentor(messages, mode, lang, projectContext);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /api/ai/mentor error:', error);
    return NextResponse.json(
      {
        content: 'Произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз.',
      },
      { status: 500 }
    );
  }
}
