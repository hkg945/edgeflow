import Link from "next/link"
import { getTranslations } from 'next-intl/server';
import { LegalLinks } from "./LegalLinks";

export async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t border-white/10 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">EdgeFlow.</h3>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('platform.title')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t('platform.premiumIndicators')}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t('platform.automatedAlerts')}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t('platform.backtesting')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t('resources.title')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t('resources.tutorials')}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t('resources.blog')}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t('resources.discord')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t('legal.title')}</h4>
            <LegalLinks />
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
}
