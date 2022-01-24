import { useContext } from 'react'
import { useFormik } from 'formik'
import Router from 'next/router'
import AppContext from '../src/utils/AppContext'

import { number, string } from 'yup'
import * as Yup from 'yup'

import Layout from '../src/components/Layout'

const EntryPage = () => {
  const { addEntry } = useContext(AppContext)

  const formik = useFormik({
    initialValues: {
      amount: '',
      title: '',
    },
    validationSchema: Yup.object({
      amount: number()
        .typeError('Veuillez renseigner un nombre')
        .min(-10000.0, 'le montant est trop bas !')
        .max(10000.0, 'Le montant est trop haut !')
        .test(
          'Amount is not 0',
          'Veuillez renseigner un montant différent de zéro',
          (amount) => amount !== 0
        )
        .required('Veuillez renseigner le montant !'),
      title: string().required('Veuillez renseigner le titre !'),
    }),
    onSubmit: (values) => {
      addEntry(values)
      formik.resetForm({
        amount: '',
        title: '',
      })
      Router.push('/')
    },
  })

  return (
    <Layout>
      <main className="h-full flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="w-2/5 flex flex-col h-2/4 justify-center"
        >
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Montant
          </label>
          <div className="mt-1 relative rounded-md shadow-sm border border-gray-700 rounded-lg">
            <div className="absolute inset-y-0 right-6 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="text"
              name="amount"
              id="amount"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-6 py-2 sm:text-sm border-gray-300 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              placeholder="0.00"
            />
          </div>
          {formik.touched.amount && formik.errors.amount ? (
            <div className="bg-red-200 text-red-500 sm:text-sm rounded-b-lg py-2 text-center m-neg-t transition-all">
              {formik.errors.amount}
            </div>
          ) : null}
          <label
            htmlFor="price"
            className="mt-8 block text-sm font-medium text-gray-700"
          >
            Titre
          </label>
          <div className="mt-1 relative rounded-md shadow-sm border border-gray-700 rounded-lg">
            <input
              type="text"
              name="title"
              id="title"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-6 py-2 sm:text-sm border-gray-300 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <div className="bg-red-200 text-red-500 sm:text-sm rounded-b-lg py-2 text-center m-neg-t">
              {formik.errors.title}
            </div>
          ) : null}
          <button
            type="submit"
            className="self-center text-white font-semibold mt-8 text-sm bg-emerald-500 hover:bg-emerald-900 py-1.5 px-4 rounded-lg transition-colors delay-80"
          >
            Valider
          </button>
        </form>
      </main>
    </Layout>
  )
}

export default EntryPage
