import Link from 'next/link'
import Table from '../Table'
import { parseISO, format } from 'date-fns'

export default function OrderTable({ users }) {
    const headers = [
        'Email',
        'Discord Username',
        'Wallet Address',
        'Created At',
    ]

    return (
        <Table headers={headers}>
            {users &&
                users.map((user, index) => {
                    const { email, wallet, createdAt } = user

                    return (
                        <tr
                            key={index}
                            className="border-b bg-white hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-600 hover:dark:text-white"
                        >
                            <td className="py-4 px-6 font-semibold">{email}</td>

                            <td className="py-4 px-6">{wallet}</td>
                            <td className="py-4 px-6">
                                {format(parseISO(createdAt), 'MMMM dd, yyyy')}
                            </td>
                        </tr>
                    )
                })}
        </Table>
    )
}
