import Video from '@/components/Video'
import React from 'react'
import { WebinarPage } from '@/types/sanity.types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type BenefitsSectionProps = {
  data: WebinarPage['benefitsSection']
}

export default function BenefitsSection({ data }: BenefitsSectionProps) {
  return (
    <section id='benefits' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <Video
            autoPlay
            muted
            loop
            src="https://vz-da4cd036-d13.b-cdn.net/50e75c2c-6c87-432d-bd6c-e7078c3e580f/play_720p.mp4"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl md:text-4xl">{data?.title}</h3>
          <div className="flex flex-col gap-4">
            {data?.benefits?.map((benefit) => (
              <div key={benefit.title} className="flex gap-2">
                <p className="text-sm md:text-lg font-semibold">{benefit.title}: <span className="font-normal">{benefit.description}</span></p>
              </div>
            ))}
          </div>
          <Button className="w-max" size="lg" variant="accent" asChild>
            <Link href={data?.CTA?.url ?? ''}>{data?.CTA?.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
