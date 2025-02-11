import { create } from "zustand";
import axios from "axios";

const API_URL = "https://f8a3f2c439e7a64e.mokky.dev/invoices";

const useInvoiceStore = create((set) => ({
    invoices: [],
    isLoading: false,

    fetchInvoices: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(API_URL);
            set({ invoices: response.data });
        } catch (error) {
            console.error("Error fetching invoices:", error);
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
            console.error("Error fetching invoice:", error);
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
            console.error("Error sending invoice:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    editInvoice: async (id, updatedData) => {
        set({ isLoading: true });
        try {
            const cleanData = JSON.parse(JSON.stringify(updatedData));

            await axios.put(`${API_URL}/${id}`, cleanData, {
                headers: { "Content-Type": "application/json" }
            });
        } catch (error) {
            console.error("Error updating invoice:", error, "Data sent:", updatedData);
        } finally {
            set({ isLoading: false });
        }
    }


}));

export default useInvoiceStore;
