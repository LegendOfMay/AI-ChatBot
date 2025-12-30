import { type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const lastMessage = messages[messages.length - 1]
  const userText = lastMessage?.parts?.find(part => part.type === 'text')?.text || ''

  const mockResponse = `This is a mock response to: "${userText}". The AI providers are currently disabled for UI testing.`

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text-delta', textDelta: mockResponse })}\n\n`))
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'finish', finishReason: 'stop' })}\n\n`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
