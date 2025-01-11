'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function translateCode(
  code: string,
  fromLanguage: string,
  toLanguage: string
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a code translation expert. Translate the provided code accurately while maintaining its functionality. Only return the translated code without any explanations."
        },
        {
          role: "user",
          content: `Translate the following ${fromLanguage} code to ${toLanguage}:\n\n${code}`
        }
      ],
      temperature: 0.2,
      max_tokens: 2000
    })

    return { 
      success: true, 
      translation: completion.choices[0].message.content 
    }
  } catch (error) {
    console.error('Translation error:', error)
    return { 
      success: false, 
      error: 'Failed to translate code. Please try again.' 
    }
  }
}

