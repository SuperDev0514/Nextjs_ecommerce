'use client'

import { Button } from '@/components/ui/button'

import { PaymentColumn } from './columns'
import Link from 'next/link'
import { EditIcon as Icon } from 'lucide-react'

interface CellActionProps {
   data: PaymentColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   return (
      <Link href={`/payments/${data.id}`}>
         <Button size="icon" variant="outline">
            <Icon className="h-4" />
         </Button>
      </Link>
   )
}
