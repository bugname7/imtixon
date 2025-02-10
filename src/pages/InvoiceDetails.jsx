import { useLocation } from "react-router-dom";

function InvoiceDetails() {
    const location = useLocation();
    const { invoice } = location.state || {};

    if (!invoice) {
        return <h2>Invoice not found</h2>;
    }

    return (
        <div>
            <h1>Invoice #{invoice.id}</h1>
            <p>Client: {invoice.clientName}</p>
        </div>
    );
}
export default InvoiceDetails