import React, { Fragment } from 'react';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { Icon } from '@iconify/react';
import FAQAccordion from '../_components/FAQAccordion';
// import CalendlyEmbed from '@/components/CalendlyEmbed';
import { client } from '@/lib/third-party/sanity.client';
import { ConsultationPage as ConsultationPageType, HomePage } from '@/types/sanity.types';
import BitrixForm from './_components/BitrixForm';
import { generateSEOMetadata } from '@/lib/utils';
import ConsultationProcessSection from '../(landing)/_components/ConsultationProcessSection';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await client.fetch<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });

  return generateSEOMetadata(seo, {
    title: 'Schedule a Free Kick Off hdshhs Meeting',
    description: 'We are the only company in North Cyprus that can offer 10 year payment plans, 0% interest, and no credit checks.',
  })
}

export default async function ConsultationPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;



  const data = await client.fetch<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const consultationProcessSection = await client.fetch<HomePage['consultationProcessSection']>(`*[_type == "homePage" && language == $lang][0].consultationProcessSection`, { lang }, { cache: 'no-store' });

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center min-h-screen bg-[url('/images/gallery/2.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="section grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 z-10">
          <div className='flex flex-col gap-6'>
            <h1 className="text-5xl md:text-6xl text-primary-foreground">
              {data?.title}
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl text-primary-foreground">{data?.subtitle}</h3>
                <p className="text-primary-foreground">
                  {data?.offerInformation?.label}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {data?.offerInformation?.items?.map((offering, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <Icon icon={offering.icon || ''} className="text-primary-foreground text-5xl md:text-5xl text-center" />
                    <p className="text-base text-primary-foreground text-center">{offering.title}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl text-primary-foreground">{data?.closerInformation?.title}</h3>
                <p className="text-primary-foreground">
                  {data?.closerInformation?.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className='relative w-full rounded-lg overflow-hidden bg-secondary grid place-items-center'>
            <BitrixForm />
            {/* <CalendlyEmbed url="https://calendly.com/rabihrabea/appointmentbooking?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319" /> */}
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-transparent'></div>
      </section>
      <ConsultationProcessSection data={consultationProcessSection} />
      <section className="section">
        <video src="https://vz-da4cd036-d13.b-cdn.net/50e75c2c-6c87-432d-bd6c-e7078c3e580f/play_720p.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover aspect-video rounded-lg overflow-hidden' />
      </section>
      <section id="faqs" className="section">
        <div className="bg-primary rounded-lg py-6 px-10 flex flex-col gap-6">
          <h2 className="text-2xl md:text-4xl text-primary-foreground">Frequently Asked Questions</h2>
          <FAQAccordion lang={lang} />
        </div>
      </section>
    </Fragment>
  );
} 