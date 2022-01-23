import React from 'react'
import PropTypes from 'prop-types'

const MovementListBody = ({ entry }) => {
  const isInbound = entry.amount > 0

  return (
    <tr>
      <td scope="col" className="px-2 py-4">
        {isInbound && (
          <>
            <p className="text-sm font-medium text-right text-green-600">
              {entry.amount.toLocaleString('fr-FR', {
                currency: 'EUR',
                style: 'currency',
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-sm font-light text-right">{entry.title}</p>
          </>
        )}
      </td>
      <td scope="col" className="px-6 py-4">
        {!isInbound && (
          <>
            <p className="text-sm font-medium text-right text-red-600">{entry.amount.toLocaleString('fr-FR', {
              currency: 'EUR',
              style: 'currency',
              maximumFractionDigits: 2,
            })}</p>
            <p className="text-sm font-light text-right">{entry.title}</p>
          </>
        )}
      </td>
    </tr>
  )
}

MovementListBody.propTypes = {
  entry: PropTypes.object,
}

export default MovementListBody
