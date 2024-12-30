import Link from 'next/link'

interface AMP {
  id: number
  sequence: string
  name: string
  length: number
  activity_type?: string
  source_organism?: string
}

interface AMPTableProps {
  amps: AMP[]
}

export function AMPTable({ amps }: AMPTableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sequence
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Length
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {amps.map((amp) => (
                  <tr key={amp.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/amp/${amp.id}`} className="text-primary hover:text-primary-dark">
                        {amp.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                      {amp.sequence.length > 20 
                        ? `${amp.sequence.substring(0, 20)}...` 
                        : amp.sequence}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{amp.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{amp.activity_type || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{amp.source_organism || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}