'use client'

import {useState, useRef} from 'react'
import QRCode from 'qrcode'
import {Download, QrCode} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {useLanguage} from './language-provider'

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
type QRSize = 200 | 300 | 400 | 500

export function QRCodeGenerator() {
  const {t} = useLanguage()
  const [text, setText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M')
  const [size, setSize] = useState<QRSize>(300)
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQRCode = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    try {
      const canvas = canvasRef.current
      if (canvas) {
        await QRCode.toCanvas(canvas, text, {
          errorCorrectionLevel: errorLevel,
          width: size,
          margin: 2,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        })
        setQrCodeUrl(canvas.toDataURL())
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = qrCodeUrl
    link.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <QrCode className="h-8 w-8 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">{t('inputLabel')}</Label>
              <Input id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('inputPlaceholder')} className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('errorSizeLabel')}</Label>
                <Select value={errorLevel} onValueChange={(value: ErrorCorrectionLevel) => setErrorLevel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">{t('errorLow')}</SelectItem>
                    <SelectItem value="M">{t('errorMedium')}</SelectItem>
                    <SelectItem value="Q">{t('errorQuartile')}</SelectItem>
                    <SelectItem value="H">{t('errorHigh')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('sizeLabel')}</Label>
                <Select value={size.toString()} onValueChange={(value) => setSize(Number(value) as QRSize)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="200">{t('small')}</SelectItem>
                    <SelectItem value="300">{t('medium')}</SelectItem>
                    <SelectItem value="400">{t('large')}</SelectItem>
                    <SelectItem value="500">{t('extraLarge')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foreground">{t('colorLabel')}</Label>
                <div className="flex gap-2">
                  <Input id="foreground" type="color" value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} className="w-16 h-10 p-1 border rounded" />
                  <Input value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">{t('backgroundLabel')}</Label>
                <div className="flex gap-2">
                  <Input id="background" type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-16 h-10 p-1 border rounded" />
                  <Input value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>

            <Button onClick={generateQRCode} disabled={!text.trim() || isGenerating} className="w-full" size="lg">
              <QrCode className="mr-2 h-4 w-4" />
              {isGenerating ? 'Generating...' : t('generateButton')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('previewTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-white dark:bg-gray-800">
                {qrCodeUrl ? <canvas ref={canvasRef} className="max-w-full h-auto" style={{display: 'none'}} /> : null}
                {qrCodeUrl ? (
                  <img src={qrCodeUrl || '/placeholder.svg'} alt="Generated QR Code" className="max-w-full h-auto rounded" />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>QR Code will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {qrCodeUrl && (
              <Button onClick={downloadQRCode} variant="outline" className="w-full bg-transparent" size="lg">
                <Download className="mr-2 h-4 w-4" />
                {t('downloadButton')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <canvas ref={canvasRef} style={{display: 'none'}} />
    </div>
  )
}
