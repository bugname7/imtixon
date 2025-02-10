import { create } from "zustand";

const useInvoiceStore = create((set) => ({
  invoices: [
    {
      id: "RT3080",
      createdAt: "2021-08-18",
      paymentDue: "2021-08-19",
      description: "Re-branding",
      paymentTerms: 1,
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      status: "paid",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientAddress: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom",
      },
      items: [
        {
          name: "Brand Guidelines",
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    },
  ],

  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),
  updateInvoice: (id, updatedInvoice) =>
    set((state) => ({
      invoices: state.invoices.map((inv) =>

        inv.id === id ? { ...inv, ...updatedInvoice } : inv),
    })), removeInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((inv) => inv.id !== id), })),
}));

export default useInvoiceStore;