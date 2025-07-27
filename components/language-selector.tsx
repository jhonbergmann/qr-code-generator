'use client'

import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {Languages} from 'lucide-react'
import {useLanguage} from './language-provider'

export function LanguageSelector() {
  const {language, setLanguage} = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Languages className="h-4 w-4" />
          {language === 'en' ? 'English' : 'Português'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pt')}>Português</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
