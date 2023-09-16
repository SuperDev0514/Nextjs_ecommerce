import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import type { PaymentColumn } from './components/columns'
import { PaymentClient } from './components/client'

export default async function PaymentsPage() {
   const payments = await prisma.payment.findMany({
      where: {},
      include: {
         provider: true,
         user: true,
         order: true,
      },
      orderBy: {
         updatedAt: 'desc',
      },
   })

   const formattedPayments: PaymentColumn[] = payments.map((payment) => ({
      id: payment.id,
      number: 'Payment #' + payment.number.toString(),
      status: payment.status,
      date: payment.createdAt.toUTCString(),
      payable: '$' + payment.payable.toString(),
      isSuccessful: payment.isSuccessful ? 'Yes.' : 'No.',
      createdAt: format(payment.createdAt, 'MMMM do, yyyy'),
   }))

   return <PaymentClient data={formattedPayments} />
}
