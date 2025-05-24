"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Video from '@/components/Video';
import { getUserInfo } from '@/lib/services/user.service';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';

type VideoArchiveFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subscribeToEmails: boolean;
}

export default function VideoArchiveForm() {
  const userInfo = getUserInfo();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      email: userInfo?.email || '',
      phoneNumber: userInfo?.phoneNumber || '',
      subscribeToEmails: false,
    },
    onSubmit: async (values) => {
      const contactInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      }

      const payload: VideoArchiveFormData = {
        ...contactInfo,
        subscribeToEmails: values.subscribeToEmails,
      }
      mutate(payload);
    }
  });

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (payload: VideoArchiveFormData) => {
      await fetch('https://automations.hibarr.net/webhook/webinar-recording', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
  })

  const videoUrl = 'https://vz-7d90b9e0-ff2.b-cdn.net/1d02b11a-b7a9-41aa-b015-42a99cc3ddae/play_720p.mp4';
  const posterUrl = 'https://vz-7d90b9e0-ff2.b-cdn.net/1d02b11a-b7a9-41aa-b015-42a99cc3ddae/thumbnail_c4dad539.jpg';

  return (
    <section className="flex items-center justify-center min-h-screen  overflow-x-hidden">
      <div className={cn("w-full p-6 bg-white rounded-lg shadow-md transition-all duration-300", isSuccess ? "max-w-6xl" : "max-w-2xl")}>
        <h3 className="text-3xl font-bold mb-6 text-center">
          {isSuccess ? "Hibarr Webinar" : "Hibarr Webinar Access Form"}
        </h3>

        {isSuccess ?
          <div className='w-full h-full'>
            <Video src={videoUrl} poster={posterUrl} />
          </div> :
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 ">
              <Input title='First Name' name="firstName" value={values.firstName} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 outline-none rounded" type="text" placeholder="First Name" required />
              <Input title='Last Name' name="lastName" value={values.lastName} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 outline-none rounded" type="text" placeholder="Last Name" required />
            </div>
            <Input title='Email' name="email" value={values.email} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 outline-none rounded" type="email" placeholder="name@email.com" required />
            <Input title='Mobile' name="phoneNumber" value={values.phoneNumber} onChange={handleChange} className="w-full p-4 text-lg bg-gray-50 outline-none rounded" type="tel" placeholder="Enter your mobile number" required />

            {/* <div className="flex items-center gap-2 w-max cursor-pointer">
              <label htmlFor="subscribeToEmails">Do you want to be the first to know when we have new real estate properties?</label>
            </div> */}
            {isError && <p className='text-red-700 text-sm'>Failed to submit your request. Please try again later.</p>}
            <Button isLoading={isPending} type="submit" className='w-full' size="lg">Submit</Button>
          </form>
        }
      </div>
    </section>
  );
}
