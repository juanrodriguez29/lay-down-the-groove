import "@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  try {
    const { record } = await req.json()
    const email = record.email

    if (!email) {
      return new Response(JSON.stringify({ error: 'No email provided' }), { status: 400 })
    }

    const brevoApiKey = Deno.env.get('BREVO_API_KEY')

    // Add contact to Brevo list
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [2],
        updateEnabled: true
      })
    })

    if (!response.ok) {
      const error = await response.json()
      return new Response(JSON.stringify({ error }), { status: 500 })
    }
   
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        to: [{ email: email }],
        templateId: 1
      })
  })

    if (!emailResponse.ok) {
      const emailError = await emailResponse.json()
      console.error('Welcome email error:', emailError)
    }
    
    return new Response(JSON.stringify({ success: true }), { status: 200 })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})