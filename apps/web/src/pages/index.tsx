import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { SearchBar } from '../components/SearchBar'
import { AMPTable } from '../components/AMPTable'

interface AMP {
  id: number
  sequence: string
  name: string
  length: number
  activity_type?: string
  source_organism?: string
}

interface Props {
  amps: AMP[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/amps')
    const amps = await response.json()
    return {
      props: { amps }
    }
  } catch (error) {
    console.error('Error fetching AMPs:', error)
    return {
      props: { amps: [] }
    }
  }
}

export default function Home({ amps }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAmps, setFilteredAmps] = useState(amps)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = amps.filter(amp => 
      amp.name.toLowerCase().includes(term.toLowerCase()) ||
      amp.sequence.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredAmps(filtered)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Antimicrobial Peptide Database</h1>
        <SearchBar value={searchTerm} onChange={handleSearch} />
        <AMPTable amps={filteredAmps} />
      </div>
    </Layout>
  )
}