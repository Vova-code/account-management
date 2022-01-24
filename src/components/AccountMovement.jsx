import React, { useCallback, useContext } from 'react'
import AppContext from '../utils/AppContext'

import MovementListBody from './MovementListBody'

const AccountMovement = () => {
  const { entryList, inbounds, outbounds } = useContext(AppContext)

  const displayBalance = useCallback(() => {
    return inbounds + outbounds
  }, [inbounds, outbounds])

  const balanceColor = () => {
    if (displayBalance() === 0) {
      return 'bg-white'
    } else if (displayBalance() > 0) {
      return 'bg-emerald-100'
    }

    return 'bg-red-200'
  }
  const balanceTextColor = () => {
    if (displayBalance() === 0) {
      return 'text-gray-300'
    } else if (displayBalance() > 0) {
      return 'text-green-600'
    }

    return 'text-red-200'
  }

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
                {entryList.map((entry) => (
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
                    {inbounds.toLocaleString('fr-FR', {
                      currency: 'EUR',
                      style: 'currency',
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td scope="col" className="px-6 py-4 bg-white text-right">
                    {outbounds.toLocaleString('fr-FR', {
                      currency: 'EUR',
                      style: 'currency',
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className={`${balanceColor()} font-medium`}>
                  <td colSpan="2" className="px-6 py-2 text-center">
                    <p className="mb-2">Résultat</p>
                    <p className={balanceTextColor()}>
                      {displayBalance().toLocaleString('fr-FR', {
                        currency: 'EUR',
                        style: 'currency',
                        maximumFractionDigits: 2,
                      })}
                    </p>
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
