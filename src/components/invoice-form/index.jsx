import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkLightMode.jsx";
import useInvoiceStore from "../../store/store.js";
import clearImage from "../../assets/images/delete.svg";

function InvoiceForm({ id }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [invoice, setInvoice] = React.useState(null);
  const { isLoading, sendInvoice, fetchInvoiceById, editInvoice } =
    useInvoiceStore();

  React.useEffect(() => {
    const fetchInvoice = async () => {
      if (id) {
        try {
          const data = await fetchInvoiceById(id);
          if (data) {
            setInvoice(data);
          }
        } catch (error) {
          console.error("Failed to fetch invoice:", error);
        }
      }
    };
    fetchInvoice();
  }, [id, fetchInvoiceById]);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: invoice || {
      id: "",
      createdAt: new Date().toISOString(),
      invoiceDate: "",
      description: "",
      paymentTerms: "Net 30 Days",
      clientName: "",
      clientEmail: "",
      status: "draft",
      senderAddress: { street: "", city: "", postCode: "", country: "" },
      clientAddress: { street: "", city: "", postCode: "", country: "" },
      items: [{ name: "", quantity: 1, price: 0, total: 0 }],
      total: 0,
    },
  });

  React.useEffect(() => {
    if (invoice) {
      reset(invoice);
    }
  }, [invoice, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const calculateTotal = (data) => {
    return data.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  };

  const onSubmit = async (data, status) => {
    try {
      const updatedData = { ...data, status, total: calculateTotal(data) };

      if (id) {
        await editInvoice(id, data);
        toast.success("saqlandi ✅");

        navigate("/");
      } else {
        await sendInvoice(updatedData);
      }

      reset();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-200 text-black"
      } px-4 py-8 container `}
    >
      <Link
        to={"/"}
        className={`${
          darkMode ? "text-purple-400" : ""
        } max-w-xl w-full mx-auto mb-8 hover:underline font-bold block text-start`}
      >
        🔙 Go Back
      </Link>

      <div className="max-w-xl w-full mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">
          {id ? "Edit Invoice" : "New Invoice"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-lg font-bold mb-4 text-purple-500">Bill From</h2>
          <input
            {...register("senderAddress.street")}
            placeholder="Street Address"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)]" : ""
            } w-full  border   rounded py-3 px-2 outline-none border-[rgba(55,59,83,1)] `}
          />
          <div className="flex gap-4">
            <input
              {...register("senderAddress.city")}
              placeholder="City"
              className="input"
            />
            <input
              {...register("senderAddress.postCode")}
              placeholder="Post Code"
              className="input"
            />
            <input
              {...register("senderAddress.country")}
              placeholder="Country"
              className="input"
            />
          </div>

          <h2 className="text-lg font-bold mb-4 text-purple-500 mt-4">
            Bill To
          </h2>
          <input
            {...register("clientName")}
            placeholder="Client's Name"
            className="input"
          />
          <input
            {...register("clientEmail")}
            placeholder="Client's Email"
            type="email"
            className="input"
          />
          <input
            {...register("clientAddress.street")}
            placeholder="Street Address"
            className="input"
          />
          <div className="flex gap-4">
            <input
              {...register("clientAddress.city")}
              placeholder="City"
              className="input"
            />
            <input
              {...register("clientAddress.postCode")}
              placeholder="Post Code"
              className="input"
            />
            <input
              {...register("clientAddress.country")}
              placeholder="Country"
              className="input"
            />
          </div>

          <h2 className="text-lg font-bold mb-4 text-purple-500 mt-4">
            Invoice Details
          </h2>
          <input {...register("invoiceDate")} type="date" className="input" />
          <select {...register("paymentTerms")} className="input">
            <option value="Net 1 Days">Net 1 Days</option>
            <option value="Net 7 Days">Net 7 Days</option>
            <option value="Net 14 Days">Net 14 Days</option>
            <option value="Net 30 Days">Net 30 Days</option>
          </select>
          <input
            {...register("description")}
            placeholder="Project Description"
            className="input"
          />

          <h2 className="text-lg font-bold mb-4 text-purple-500 mt-4">
            Item List
          </h2>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-4 mb-4">
              <input
                {...register(`items.${index}.name`)}
                placeholder="Item Name"
                className="input"
              />
              <input
                {...register(`items.${index}.quantity`)}
                type="number"
                className="input"
              />
              <input
                {...register(`items.${index}.price`)}
                type="number"
                className="input"
              />
              <button type="button" onClick={() => remove(index)}>
                <img src={clearImage} alt="Remove" className="w-6 h-6" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ name: "", quantity: 1, price: 0, total: 0 })
            }
            className="btn"
          >
            + Add Item
          </button>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => reset()} className="btn">
              {id ? "Cansel" : "Discard"}
            </button>
            {id ? (
              <button type="button" onClick={handleSubmit(onSubmit)}>
                Save changes
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "draft"))}
                  className={`${darkMode ? 'bg-slate-800':'bg-slate-900'} font-spartan font-bold  py-3 text-slate-400 px-5 hover:bg-slate-700 rounded-full` }
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "pending"))}
                  className={`${darkMode? 'bg-purple-800':'bg-purple-600'} text-slate-50 px-5 rounded-full hover:bg-purple-700`}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Save & Send"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
