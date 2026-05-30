import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FullScreenLoaderProps {
    message?: string;
    className?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ message, className }) => {
  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center w-full", className)}>
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  )
}

export default FullScreenLoader