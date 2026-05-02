import "@supabase/functions-js/edge-runtime.d.ts"

// CORS headers — allows browsers to call this function from any domain
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {

  // Browsers send a "preflight" OPTIONS request before the real request
  // to check if CORS is allowed. We need to respond to it.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Extract release data and vibe notes from React's request body
    const { release, vibeNotes } = await req.json()

    // Get the API key from Supabase secrets (never exposed to frontend)
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')

    // Build the prompt dynamically with the release data
    const prompt = `You are a music publicist for an underground electronic music label called Lay Down The Groove (LDG) based in Melbourne, Australia.

Generate press copy for the following release:

Release Title: ${release.title}
Artist: ${release.artist}
Year: ${release.year}
Format: ${release.format}
Additional notes: ${vibeNotes || 'None provided'}

Please generate three pieces of copy:

1. PRESS RELEASE (2-3 paragraphs, professional tone, for music blogs and press)
2. SOCIAL MEDIA POST (short, punchy, for Instagram, include relevant hashtags)
3. BANDCAMP DESCRIPTION (2 paragraphs, mix of professional and personal tone)

Keep the tone raw, underground and authentic to the label's identity.`

    // Call the Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,          // authenticates with Anthropic
        'anthropic-version': '2023-06-01'   // which API version to use
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',  // which Claude model
        max_tokens: 1024,             // max length of response
        messages: [
          { role: 'user', content: prompt }  // the conversation
        ]
      })
    })

    // Get raw text first then parse — helps debug if response isn't valid JSON
    const rawText = await response.text()
    const data = JSON.parse(rawText)

    // Extract the generated text from Claude's response
    const generatedText = data.content[0].text

    // Send back to React with CORS headers
    return new Response(JSON.stringify({ result: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    // If anything goes wrong, send back the error with CORS headers
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})