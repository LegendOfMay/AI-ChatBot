export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { prompt, referenceImage } = await req.json()

    if (!prompt) {
      return Response.json({ error: "No prompt provided" }, { status: 400 })
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockImageSvg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#e2e8f0"/>
      <text x="50%" y="45%" text-anchor="middle" fill="#64748b" font-size="20" font-family="monospace">Mock Image</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="monospace">Prompt: ${prompt.substring(0, 30)}...</text>
    </svg>`

    const base64Image = Buffer.from(mockImageSvg).toString('base64')
    const imageDataUrl = `data:image/svg+xml;base64,${base64Image}`

    return Response.json({
      imageUrl: imageDataUrl,
      text: `Mock image generated for prompt: "${prompt}"`,
      usage: { promptTokens: 0, completionTokens: 0 },
    })
  } catch (error) {
    console.error("Error generating image:", error)
    return Response.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
