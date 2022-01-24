import { createContext, useCallback, useEffect, useState } from 'react'
import { entries } from './entries'

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [entryList, setEntryList] = useState([])
  const [inbounds, setInbounds] = useState(0)
  const [outbounds, setOutbounds] = useState(0)

  useEffect(() => {
    const savedEntries = localStorage.getItem('entryList')

    if (savedEntries === null) {
      setEntryList(entries)
      localStorage.setItem('entryList', JSON.stringify(entries))
    } else {
      setEntryList(JSON.parse(savedEntries))
    }
  }, [])

  useEffect(() => {
    entryList.map((entry) => {
      if (entry.amount < 0) {
        setOutbounds(() =>
          entryList.reduce((previousValue, currentValue) => {
            if (currentValue.amount > 0) {
              return previousValue
            }

            return previousValue + Number(currentValue.amount)
          }, 0)
        )
      } else {
        setInbounds(() =>
          entryList.reduce((previousValue, currentValue) => {
            if (currentValue.amount < 0) {
              return previousValue
            }

            return previousValue + Number(currentValue.amount)
          }, 0)
        )
      }
    })
  }, [entryList])

  const addEntry = (entry) => {
    const newEntry = {
      id: entryList.length + 1,
      title: entry.title,
      amount: Number(entry.amount),
    }
    setEntryList((prevState) => setEntryList([...prevState, newEntry]))
    localStorage.setItem('entryList', JSON.stringify(entryList))
  }

  const clearEntries = useCallback(() => {
    setEntryList([])
    setInbounds(0)
    setOutbounds(0)
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{ entryList, inbounds, outbounds, addEntry, clearEntries }}
    />
  )
}

export default AppContext
