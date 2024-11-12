import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const requestData = data.body || data;
    const { move, position, moveNumber, color, moveHistory } = requestData;
    
    if (!move || !position) {
      return new Response('Missing move or position', { status: 400 });
    }

    const actualMoveNumber = moveNumber || Math.ceil((moveHistory?.split(' ').length || 1) / 2);
    const actualColor = color || (moveHistory?.split(' ').length % 2 === 0 ? 'Black' : 'White');

    const analysisPrompt = `As an experienced chess teacher, analyze this chess position:

Move: ${actualColor} plays ${actualMoveNumber}. ${move}
Position (FEN): ${position}
Game history: ${moveHistory}

Please provide a detailed but concise analysis using this format:

**Opening Analysis**
- Name the opening or type of position (if applicable)
- Explain the key ideas behind this move

**Strategic Assessment**
- Evaluate the control of key squares
- Discuss piece development and mobility
- Comment on center control and pawn structure

**Next Steps**
- Provide specific learning points for this position
- Mention common ideas or plans in similar positions
- Suggest what both players should focus on next

Keep the tone encouraging and educational, focusing on helping players understand the key concepts. Explain chess principles in clear, beginner-friendly terms.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an experienced chess teacher known for clear, encouraging explanations that help beginners understand chess concepts. Your analysis should be educational and focus on fundamental principles rather than complex variations. Use markdown formatting for section headers.',
        },
        {
          role: 'user',
          content: analysisPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Error analyzing move', { status: 500 });
  }
}