import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MAIN_LAYOUT, PROFILE } from '@/lib/constants'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* LARGE 404 TEXT */}
            <p className="text-8xl font-bold text-primary font-mono">{PROFILE.NOT_FOUND.FOUR_HUNDRED_FOUR}</p>

            {/* MESSAGE */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{PROFILE.NOT_FOUND.USER_NOT_FOUND}</h1>
              <p className="text-muted-foreground">{PROFILE.NOT_FOUND.USER_NOT_EXIST}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="default" asChild>
                <Link href={MAIN_LAYOUT.NAVBAR.home.href}>
                  <HomeIcon className="mr-2 size-4" />
                  {PROFILE.NOT_FOUND.BACK_TO_HOME}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound