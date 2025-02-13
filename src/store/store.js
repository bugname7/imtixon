import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

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
            toast.error("Fakturalarni yuklashda xatolik!");
            console.error("Xatolik mavjud!", error);
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
            toast.error("Fakturani yuklashda xatolik!");
            console.error("Xatolik mavjud!", error);
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    sendInvoice: async (data) => {
        set({ isLoading: true });
        try {
            await axios.post(API_URL, data);
            toast.success("Faktura muvaffaqiyatli qoshildi!");
        } catch (error) {
            toast.error("Faktura qoshishda xatolik!");
            console.error("Xatolik mavjud!", error);
        } finally {
            set({ isLoading: false });
        }
    },

    editInvoice: async (id, updatedData) => {
        set({ isLoading: true });
        try {
            await axios.patch(`${API_URL}/${id}`, updatedData);
            toast.success("Faktura muvaffaqiyatli yangilandi!");
        } catch (error) {
            toast.error("Faktura yangilashda xatolik!");
            console.error("Xatolik mavjud!", error, "Data sent:", updatedData);
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
            toast.success("Faktura muvaffaqiyatli ochirildi!");
        } catch (error) {
            toast.error("Faktura ochirishda xatolik!");
            console.error("Xatolik mavjud!", error);
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
            toast.success("Faktura statusi yangilandi!");
        } catch (error) {
            toast.error("Faktura statusini yangilashda xatolik!");
            console.error("Xatolik mavjud!", error);
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useInvoiceStore;
