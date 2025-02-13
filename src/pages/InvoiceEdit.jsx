import React from 'react'
import InvoiceForm from '../components/invoice-form/index.jsx'
import { useParams } from 'react-router-dom';
function InvoiceEdit() {
    const { id } = useParams();
    console.log(id)
    return (

        <InvoiceForm id={id} />

    )
}

export default InvoiceEdit
