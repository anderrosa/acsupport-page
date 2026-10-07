import { WhatsappLogo } from '@phosphor-icons/react'
import { useState, type FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { buildContactWhatsAppUrl } from '@/lib/whatsapp'

type ContactFormFields = {
  name: string
  email: string
  message: string
}

const initialFields: ContactFormFields = {
  name: '',
  email: '',
  message: '',
}

export function ContactForm({ className }: { className?: string }) {
  const [fields, setFields] = useState<ContactFormFields>(initialFields)

  const updateField = (key: keyof ContactFormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const url = buildContactWhatsAppUrl(fields)
    if (!url) return

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form
      data-slot="contact-form"
      onSubmit={handleSubmit}
      className={twMerge('flex h-full flex-col gap-5 md:gap-6', className)}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
        <div data-slot="contact-form-field" className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-white/80">
            Nome
          </label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Seu nome"
            value={fields.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </div>

        <div data-slot="contact-form-field" className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-white/80">
            E-mail
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            value={fields.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>
      </div>

      <div data-slot="contact-form-field" className="flex flex-1 flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-white/80">
          Mensagem
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder="Como podemos ajudar?"
          value={fields.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="min-h-40 flex-1 lg:min-h-48"
        />
      </div>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        data-slot="contact-form-submit"
        className="mt-auto w-full shrink-0 sm:w-auto sm:self-start [&_svg]:size-5"
      >
        <WhatsappLogo className="shrink-0" weight="regular" aria-hidden="true" />
        Enviar pelo WhatsApp
      </Button>
    </form>
  )
}
