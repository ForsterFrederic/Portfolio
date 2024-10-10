import { Button } from '@/components/ui/button'
import React from 'react'

export default function CompetenciesPage() {
  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-3">
            You have no Competence
          </h1>
          <Button>Create Competence</Button>
        </div>
      </div>
    </main>)
}
