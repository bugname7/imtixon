function InvoiceDetails() {
    const { id } = useParams();
    const invoice = data.find((item) => item.id === id);

    if (!invoice) {
        return <div>Invoice not found</div>;
    }

    return (
        <div className="p-8 bg-slate-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Invoice #{invoice.id}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="font-medium">Invoice Date:</p>
                    <p>{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="font-medium">Payment Due:</p>
                    <p>{new Date(invoice.paymentDue).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="font-medium">Client Name:</p>
                    <p>{invoice.clientName}</p>
                </div>
                <div>
                    <p className="font-medium">Client Email:</p>
                    <p>{invoice.clientEmail}</p>
                </div>
                <div>
                    <p className="font-medium">Address:</p>
                    <p>
                        {invoice.clientAddress.street}, {invoice.clientAddress.city}, {invoice.clientAddress.postCode}, {invoice.clientAddress.country}
                    </p>
                </div>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Item Name</th>
                        <th className="border px-4 py-2">QTY</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-2">{`£${item.price.toFixed(2)}`}</td>
                            <td className="border px-4 py-2">{`£${(item.price * item.quantity).toFixed(2)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-lg font-bold text-right">
                Amount Due: £{invoice.total.toFixed(2)}
            </div>
        </div>
    );
}
export default InvoiceDetails