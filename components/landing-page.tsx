'use client'

import {QrCode, Zap, Palette, Download, Globe, Shield, Github} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {useLanguage} from './language-provider'
import {LanguageSelector} from './language-selector'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({onGetStarted}: LandingPageProps) {
  const {t} = useLanguage()

  const features = [
    {
      icon: Zap,
      titleKey: 'featureInstant',
      descKey: 'featureInstantDesc',
    },
    {
      icon: Palette,
      titleKey: 'featureCustom',
      descKey: 'featureCustomDesc',
    },
    {
      icon: Download,
      titleKey: 'featureDownload',
      descKey: 'featureDownloadDesc',
    },
    {
      icon: Globe,
      titleKey: 'featureMultiLang',
      descKey: 'featureMultiLangDesc',
    },
    {
      icon: Shield,
      titleKey: 'featureSecure',
      descKey: 'featureSecureDesc',
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <header className="relative z-10 flex justify-end p-6">
        <LanguageSelector />
      </header>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce-slow">
            <QrCode className="h-16 w-16 text-indigo-600" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
            {t('heroTitle')}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">{t('heroSubtitle')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <QrCode className="mr-2 h-5 w-5" />
              {t('getStarted')}
            </Button>

            <Button
              onClick={() => window.open('https://github.com/jhonbergmann/qr-code-generator', '_blank')}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 bg-transparent"
            >
              {t('learnMore')}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t(feature.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t(feature.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('demoTitle')}</h2>
          <div className="inline-block p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({length: 64}).map((_, i) => (
                  <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'} animate-pulse`} style={{animationDelay: `${i * 50}ms`}} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-8 text-gray-600 dark:text-gray-400">
        <div className="flex items-center justify-center pt-4">
          <a
            href="https://github.com/jhonbergmann/qr-code-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm"
          >
            <Github className="w-4 h-4" />
            <span className="font-medium">jhonbergmann/qr-code-generator</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
