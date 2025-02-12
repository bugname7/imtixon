import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkLightMode.jsx";
import useInvoiceStore from "../../store/store.js";
import clearImage from "../../assets/images/delete.svg";

function InvoiceForm({ id }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [invoice, setInvoice] = useState(null);
  const { isLoading, sendInvoice, fetchInvoiceById, editInvoice } =
    useInvoiceStore();

  useEffect(() => {
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

  useEffect(() => {
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
        darkMode ? "bg-slate-950 text-white" : "bg-slate-200 "
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
          <h2 className="font-spartan font-bold mb-4 text-purple-500">
            Bill From
          </h2>
          <label
            htmlFor="street"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  inline-block`}
          >
            Street Address
          </label>
          <input
            id="street"
            {...register("senderAddress.street")}
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full   border   py-3 px-2 outline-none mb-2 `}
          />
          <div className=" gap-4">
            <label
              htmlFor="city"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              City
            </label>

            <input
              id="city"
              {...register("senderAddress.city")}
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md    w-full  border    py-3 px-2 outline-none mb-2 `}
            />
            <label
              htmlFor="pcode"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              Post Code
            </label>

            <input
              id="pcode"
              {...register("senderAddress.postCode")}
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
            />
            <label
              htmlFor="country"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              Country
            </label>

            <input
              {...register("senderAddress.country")}
              id="country"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
            />
          </div>

          <h2 className="text-lg font-bold mb-4 text-purple-500 mt-4">
            Bill To
          </h2>
          <label
            htmlFor="clientname"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Clients Name
          </label>

          <input
            {...register("clientName")}
            id="clientname"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
          />
          <label
            htmlFor="clientemail"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Clients Email
          </label>

          <input
            {...register("clientEmail")}
            id="clientemail"
            type="email"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
          />
          <label
            htmlFor="streetAddres"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Street Address
          </label>

          <input
            {...register("clientAddress.street")}
            id="streetAddres"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
          />
          <div className=" gap-4">
            <label
              htmlFor="clientcity"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              City
            </label>

            <input
              {...register("clientAddress.city")}
              id="clientcity"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
            />
            <label
              htmlFor="clientpostcode"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
Post Code            </label>

            <input
              {...register("clientAddress.postCode")}
id="clientpostcode"              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
            />
            <label
              htmlFor="clientCount"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              Clients Name
            </label>

            <input
              {...register("clientAddress.country")}
              placeholder="Country"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
            />
          </div>

          <h2 className="text-lg font-bold mb-4 text-purple-500 mt-4">
            Invoice Details
          </h2>
          <label
            htmlFor="clientname"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Clients Name
          </label>

          <input
            {...register("invoiceDate")}
            type="date"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
          />
          <select
            {...register("paymentTerms")}
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
          >
            <option value="Net 1 Days">Net 1 Days</option>
            <option value="Net 7 Days">Net 7 Days</option>
            <option value="Net 14 Days">Net 14 Days</option>
            <option value="Net 30 Days">Net 30 Days</option>
          </select>
          <label
            htmlFor="clientname"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Clients Name
          </label>

          <input
            {...register("description")}
            placeholder="Project Description"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
          />

          <h2 className="text-lg font-bold mb-4 text-purple-500 mt-4">
            Item List
          </h2>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-4 mb-4">
              <label
                htmlFor="clientname"
                className={`${
                  darkMode ? "text-slate-300" : "text-slate-500"
                } font-medium font-spartan mb-1  `}
              >
                Clients Name
              </label>

              <input
                {...register(`items.${index}.name`)}
                placeholder="Item Name"
                className={`${
                  darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
              />
              <label
                htmlFor="clientname"
                className={`${
                  darkMode ? "text-slate-300" : "text-slate-500"
                } font-medium font-spartan mb-1  `}
              >
                Clients Name
              </label>

              <input
                {...register(`items.${index}.quantity`)}
                type="number"
                className={`${
                  darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
              />
              <label
                htmlFor="clientname"
                className={`${
                  darkMode ? "text-slate-300" : "text-slate-500"
                } font-medium font-spartan mb-1  `}
              >
                Clients Name
              </label>

              <input
                {...register(`items.${index}.price`)}
                type="number"
                className={`${
                  darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                } rounded-md    w-full  border   py-3 px-2 outline-none mb-2 `}
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
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className={`${
                  darkMode ? "bg-purple-800" : "bg-purple-600"
                } text-slate-50 px-5 rounded-full hover:bg-purple-700`}
              >
                Save changes
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "draft"))}
                  className={`${
                    darkMode ? "bg-slate-800" : "bg-slate-900"
                  } font-spartan font-bold  py-3 text-slate-400 px-5 hover:bg-slate-700 rounded-full`}
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, "pending"))}
                  className={`${
                    darkMode ? "bg-purple-800" : "bg-purple-600"
                  } text-slate-50 px-5 rounded-full hover:bg-purple-700`}
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
