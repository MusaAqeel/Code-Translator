'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { translateCode } from './actions'

const languages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Rust',
  'TypeScript',
  'PHP',
  'Swift'
]

export default function CodeTranslator() {
  const [fromLang, setFromLang] = useState<string>('')
  const [toLang, setToLang] = useState<string>('')
  const [sourceCode, setSourceCode] = useState('')
  const [translation, setTranslation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleTranslate() {
    if (!fromLang || !toLang || !sourceCode) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await translateCode(sourceCode, fromLang, toLang)
      if (result.success) {
        setTranslation(result.translation ?? '')
      } else {
        setError(result.error ?? 'An error occurred')
      }
    } catch (e) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto p-4 max-w-6xl">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Code Translator
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-4 pt-8 max-w-6xl">
        
        <div className="grid gap-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">From</label>
              <Select value={fromLang} onValueChange={setFromLang}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">To</label>
              <Select value={toLang} onValueChange={setToLang}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Source Code</label>
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-full h-[400px] p-4 font-mono text-sm rounded-lg border bg-muted/50"
                placeholder="Paste your code here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Translated Code</label>
              <textarea
                value={translation}
                readOnly
                className="w-full h-[400px] p-4 font-mono text-sm rounded-lg border bg-muted/50"
                placeholder="Translation will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button 
            onClick={handleTranslate} 
            disabled={isLoading || !fromLang || !toLang || !sourceCode}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Translating...
              </>
            ) : (
              'Translate'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

