import React, { useEffect, useState } from 'react'

import { entries } from '../utils/entries'
import MovementListBody from './MovementListBody'

const AccountMovement = () => {
  const [inbounds, setInbounds] = useState([])
  const [outbounds, setOutbounds] = useState([])

  useEffect(() => {
    entries.map((entry) => {
      if (entry.amount < 0) {
        setOutbounds((prevOutbounds) => [...prevOutbounds, entry])
      } else {
        setInbounds((prevInbounds) => [...prevInbounds, entry])
      }
    })
  }, [])

  const displayTotal = (amountList) => {
    let totalAmount = 0
    amountList.map((outbound) => {
      totalAmount += outbound.amount
    })

    return totalAmount
  }

  const displayBalance = () => {
    return displayTotal(inbounds) + displayTotal(outbounds)
  }

  const balanceColor = displayBalance() > 0 ? 'bg-emerald-100' : 'bg-red-200'

  return (
    <div className="flex flex-col w-3/5">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 w-full">
              <thead className="bg-gray-500 w-full">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r"
                  >
                    Entrées
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Dépenses
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 w-full">
                {entries.map((entry) => (
                  <MovementListBody key={entry.id} entry={entry} />
                ))}
              </tbody>
              <tfoot className="bg-gray-500 w-full divide-y divide-gray-200">
                <tr className="w-full">
                  <th
                    scope="col"
                    className="w-1/2 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r"
                  >
                    Total entrées
                  </th>
                  <th
                    scope="col"
                    className="w-1/2 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Total dépenses
                  </th>
                </tr>
                <tr scope="row" className="w-full">
                  <td scope="col" className="px-6 py-4 bg-white text-right">
                    {displayTotal(inbounds).toLocaleString('fr-FR', {
                      currency: 'EUR',
                      style: 'currency',
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td scope="col" className="px-6 py-4 bg-white text-right">
                    {displayTotal(outbounds).toLocaleString('fr-FR', {
                      currency: 'EUR',
                      style: 'currency',
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className={balanceColor}>
                  <td colSpan="2" className="px-6 py-2 text-center">
                    <p className="mb-2">Résultat</p>
                    <p>{displayBalance().toLocaleString('fr-FR', {
                      currency: 'EUR',
                      style: 'currency',
                      maximumFractionDigits: 2,
                    })}</p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountMovement
