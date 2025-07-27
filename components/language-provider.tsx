'use client'

import {createContext, useContext, useState, type ReactNode} from 'react'

type Language = 'en' | 'pt'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    title: 'QR Code Generator',
    subtitle: 'Generate QR codes instantly for any text or URL',
    inputLabel: 'Enter text or URL',
    inputPlaceholder: 'https://example.com or any text...',
    generateButton: 'Generate QR Code',
    downloadButton: 'Download QR Code',
    errorSizeLabel: 'Error Correction Level',
    sizeLabel: 'QR Code Size',
    colorLabel: 'Foreground Color',
    backgroundLabel: 'Background Color',
    previewTitle: 'QR Code Preview',
    errorLow: 'Low (~7%)',
    errorMedium: 'Medium (~15%)',
    errorQuartile: 'Quartile (~25%)',
    errorHigh: 'High (~30%)',
    small: 'Small (200x200)',
    medium: 'Medium (300x300)',
    large: 'Large (400x400)',
    extraLarge: 'Extra Large (500x500)',
    heroTitle: 'QR Code Generator',
    heroSubtitle: 'Create beautiful, customizable QR codes instantly. Perfect for businesses, events, and personal use.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    featureInstant: 'Instant Generation',
    featureInstantDesc: 'Generate QR codes in milliseconds with our optimized engine',
    featureCustom: 'Full Customization',
    featureCustomDesc: 'Choose colors, sizes, and error correction levels',
    featureDownload: 'Easy Download',
    featureDownloadDesc: 'Save your QR codes as high-quality PNG images',
    featureMultiLang: 'Multi-Language',
    featureMultiLangDesc: 'Available in English and Portuguese',
    featureSecure: 'Secure & Private',
    featureSecureDesc: 'All processing happens locally in your browser',
    demoTitle: 'See It In Action',
    footerText: 'Built with ❤️',
  },
  pt: {
    title: 'Gerador de QR Code',
    subtitle: 'Gere códigos QR instantaneamente para qualquer texto ou URL',
    inputLabel: 'Digite o texto ou URL',
    inputPlaceholder: 'https://exemplo.com ou qualquer texto...',
    generateButton: 'Gerar QR Code',
    downloadButton: 'Baixar QR Code',
    errorSizeLabel: 'Nível de Correção de Erro',
    sizeLabel: 'Tamanho do QR Code',
    colorLabel: 'Cor do Primeiro Plano',
    backgroundLabel: 'Cor do Fundo',
    previewTitle: 'Visualização do QR Code',
    errorLow: 'Baixo (~7%)',
    errorMedium: 'Médio (~15%)',
    errorQuartile: 'Quartil (~25%)',
    errorHigh: 'Alto (~30%)',
    small: 'Pequeno (200x200)',
    medium: 'Médio (300x300)',
    large: 'Grande (400x400)',
    extraLarge: 'Extra Grande (500x500)',
    heroTitle: 'Gerador de QR Code',
    heroSubtitle: 'Crie códigos QR bonitos e personalizáveis instantaneamente. Perfeito para empresas, eventos e uso pessoal.',
    getStarted: 'Começar',
    learnMore: 'Saiba Mais',
    featureInstant: 'Geração Instantânea',
    featureInstantDesc: 'Gere códigos QR em milissegundos com nosso motor otimizado',
    featureCustom: 'Personalização Completa',
    featureCustomDesc: 'Escolha cores, tamanhos e níveis de correção de erro',
    featureDownload: 'Download Fácil',
    featureDownloadDesc: 'Salve seus códigos QR como imagens PNG de alta qualidade',
    featureMultiLang: 'Multi-idioma',
    featureMultiLangDesc: 'Disponível em inglês e português',
    featureSecure: 'Seguro e Privado',
    featureSecureDesc: 'Todo processamento acontece localmente no seu navegador',
    demoTitle: 'Veja em Ação',
    footerText: 'Feito com ❤️',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{language, setLanguage, t}}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
