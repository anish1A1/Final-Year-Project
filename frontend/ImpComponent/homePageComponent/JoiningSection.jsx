"use client";
import React, {useContext} from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../utils/auth'
import { Button } from '@/components/ui/button';

const JoiningSection = () => {
    const {user} = useContext(AuthContext);
    const router = useRouter()


  return (
    <>
    {!user ? 
        <section className="py-16  mt-6 mb-12 text-black">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
                <p className="text-slate-600 max-w-2xl mb-8">
                  Join thousands of satisfied customers who trust our platform for trading, shopping, and equipment rental.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => router.push('/login')} className="bg-blue-500 text-white hover:bg-slate-400">
                    Create Account
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-gray-500">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
        : null
    }
    </>
    
  )
}

export default JoiningSection;
