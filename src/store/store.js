import { create } from "zustand";
import axios from "axios";

const API_URL = "https://f8a3f2c439e7a64e.mokky.dev/invoices";

const useInvoiceStore = create((set, get) => ({
    invoices: [],
    isLoading: false,

    fetchInvoices: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(API_URL);
            set({ invoices: response.data });
        } catch (error) {
            console.error("Xatolik mavjudga oxshaydi!", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchInvoiceById: async (id) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Xatolik mavjudga oxshaydi!", error);
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    sendInvoice: async (data) => {
        set({ isLoading: true });
        try {
            await axios.post(API_URL, data);
        } catch (error) {
            console.error("Xatolik mavjudga oxshaydi!", error);
        } finally {
            set({ isLoading: false });
        }
    },

    editInvoice: async (id, updatedData) => {
        set({ isLoading: true });
        try {
            await axios.patch(`${API_URL}/${id}`, updatedData);
        } catch (error) {
            console.error("Xatolik mavjudga oxshaydi!", error, "Data sent:", updatedData);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteInvoice: async (id) => {
        set({ isLoading: true });
        try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
                invoices: state.invoices.filter(invoice => invoice.id !== id)
            }));
        } catch (error) {
            console.error("Xatolik mavjudga oxshaydi!", error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateInvoiceStatus: async (id, newStatus) => {
        set({ isLoading: true });
        try {
            await axios.patch(`${API_URL}/${id}`, { status: newStatus });

            set((state) => ({
                invoices: state.invoices.map(invoice =>
                    invoice.id === id ? { ...invoice, status: newStatus } : invoice
                )
            }));
        } catch (error) {
            console.error("Xatolik mavjudga oxshaydi!", error);
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useInvoiceStore;
