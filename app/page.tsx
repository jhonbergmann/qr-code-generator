'use client'
import {useState} from 'react'
import {LanguageProvider} from '@/components/language-provider'
import {LandingPage} from '@/components/landing-page'
import {QRCodeGenerator} from '@/components/qr-code-generator'
import {LanguageSelector} from '@/components/language-selector'

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false)

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {!showGenerator ? (
          <LandingPage onGetStarted={() => setShowGenerator(true)} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setShowGenerator(false)} className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                ← Back to Home
              </button>
              <LanguageSelector />
            </div>
            <QRCodeGenerator />
          </div>
        )}
      </div>
    </LanguageProvider>
  )
}
