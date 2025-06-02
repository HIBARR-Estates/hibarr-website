"use client"

import LandingSection from './LandingSection'
import { HomePage } from '@/types/sanity.types'
// import Image from 'next/image'
// import AnimatedLandingSection from './AnimatedLandingSection'
// import { useFeatureFlagVariantKey } from 'posthog-js/react'

type LandingWrapperProps = {
  data: HomePage
}

export default function LandingWrapper({ data }: LandingWrapperProps) {
  // const posthog = PostHogClient();
  // const distinctId = getUserDistinctId();
  // const landingSectionFlagKey = await posthog.getFeatureFlag('landing-section', distinctId)

  // const landingSectionFlagKey = useFeatureFlagVariantKey('landing-section')

  // if (landingSectionFlagKey === undefined) {
  //   return (
  //     <div className='flex justify-center items-center h-screen'>
  //       <Image src='/logos/logo-blue.png' className='animate-pulse' alt='logo' width={250} height={50} />
  //     </div>
  //   )
  // }

  // if (landingSectionFlagKey === 'animated') {
  //   return <AnimatedLandingSection data={data} />
  // }

  // if (landingSectionFlagKey === 'control') {
  //   return <LandingSection data={data} />
  // }

  return <LandingSection data={data} />
}
