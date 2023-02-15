"use client"

import { Fragment, useCallback, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { NoteMeta } from '@/lib/types'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/navigation';

// eslint-disable-next-line
const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then((res) => res.json())

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const onSelect = useCallback((note: NoteMeta) => {
    router.push(`/${note.fileName}`);
  }, []);

  const { data: allNote, error, isLoading } = useSWR<NoteMeta[]>("/cache/notes.json", fetcher)

  const filteredNotes: NoteMeta[] =
    !allNote ? [] :
      query === ''
        ? allNote
        : allNote.filter((note) => note.fileName.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  return (
    <SWRConfig>
      <Combobox value={null} onChange={onSelect} nullable>
        <div className="not-prose relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input

              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(note: NoteMeta) => note?.fileName}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              { }
              {filteredNotes.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredNotes.map((note) => (
                  <Combobox.Option
                    key={note.fileName}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={note}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {note.fileName}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </SWRConfig>
  )
}
