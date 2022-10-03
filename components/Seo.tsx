import { NextSeo } from 'next-seo';
import React from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

type SeoProps = {
    title: string | null;
}

const Seo: React.FC<SeoProps> = ({ title }: SeoProps) => {
  const { asPath } = useRouter();
  const canonicalUrl = (`https://prahojetemos.com.br${asPath === '/' ? '' : asPath}`).split('?')[0];
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YKTDC5238F"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YKTDC5238F', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <NextSeo
        title={`${title || 'Últimos termos pesquiados'} | Prahojetemos`}
        description="As notícias dos termos mais pesquisados na net das últimas 24 horas"
        canonical={canonicalUrl}
      />
    </>
  );
};

export default Seo;
