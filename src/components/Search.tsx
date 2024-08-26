'use client'

import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchQuery && router.push(`/search/${searchQuery}`)
    setSearchQuery('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-black p-2 text-xl text-center rounded-md"
        placeholder="Moon..."
        type="text"
        name="searchQuery"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </form>
  )
}

export default Search
