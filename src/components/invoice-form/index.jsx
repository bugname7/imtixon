import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkLightMode.jsx";
import useInvoiceStore from "../../store/store.js";
import clearImage from "../../assets/images/delete.svg";
import { toast } from "react-hot-toast";

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

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
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
  useEffect(() => {
    const items = watch("items");
    items.forEach((item, index) => {
      const total = (item.quantity || 0) * (item.price || 0);
      setValue(`items.${index}.total`, total);
    });
  }, [watch("items")]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const calculateTotal = (data) => {
    console.log("data.items:", data.items);
    if (!Array.isArray(data.items)) {
      console.error("❌ Xatolik: `items` massiv emas!", data.items);
      return 0;
    }

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
            {...register("senderAddress.street", {
              required: "Ko'cha nomini kiriting",
              minLength: {
                value: 3,
                message: "Kamida 3 ta harf bolishi kerak",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Faqat harflardan iborat bolishi kerak",
              },
            })}
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
          />

          {errors.senderAddress?.street && (
            <p className="text-red-500 text-sm">
              {errors.senderAddress.street.message}
            </p>
          )}

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
              {...register("senderAddress.city", {
                required: "Shahar nomini kiriting",
                minLength: {
                  value: 2,
                  message: "Kamida 2 ta harf bolishi kerak",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Faqat harflardan iborat bolishi kerak",
                },
              })}
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
            />

            {errors.senderAddress?.city && (
              <p className="text-red-500 text-sm">
                {errors.senderAddress.city.message}
              </p>
            )}

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
              {...register("senderAddress.postCode", {
                required: "Pochta kodini kiriting",
                pattern: {
                  value: /^[0-9]{5,6}$/,
                  message: "Faqat 5 yoki 6 xonali raqam bolishi kerak",
                },
              })}
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
            />

            {errors.senderAddress?.postCode && (
              <p className="text-red-500 text-sm">
                {errors.senderAddress.postCode.message}
              </p>
            )}

            <label
              htmlFor="country"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              Country
            </label>

            <input
              {...register("senderAddress.country", {
                required: "Mamlakat nomini kiriting",
                minLength: {
                  value: 3,
                  message: "Kamida 3 ta harf bolishi kerak",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Faqat harflardan iborat bolishi kerak",
                },
              })}
              id="country"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
            />

            {errors.senderAddress?.country && (
              <p className="text-red-500 text-sm">
                {errors.senderAddress.country.message}
              </p>
            )}
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
            {...register("clientName", {
              required: "Mijoz ismini kiriting",
              minLength: {
                value: 3,
                message: "Kamida 3 ta harf bolishi kerak",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Faqat harflardan iborat bolishi kerak",
              },
            })}
            id="clientname"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
          />

          {errors.clientName && (
            <p className="text-red-500 text-sm">{errors.clientName.message}</p>
          )}

          <label
            htmlFor="clientemail"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Clients Email
          </label>

          <input
            {...register("clientEmail", {
              required: "Email manzilini kiriting",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Notogri email formati",
              },
            })}
            id="clientemail"
            type="email"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
          />

          {errors.clientEmail && (
            <p className="text-red-500 text-sm">{errors.clientEmail.message}</p>
          )}

          <label
            htmlFor="streetAddres"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Street Address
          </label>

          <input
            {...register("clientAddress.street", {
              required: "Manzilni kiriting",
              minLength: {
                value: 5,
                message: "Kamida 5 ta belgi bolishi kerak",
              },
            })}
            id="streetAddres"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
          />

          {errors.clientAddress?.street && (
            <p className="text-red-500 text-sm">
              {errors.clientAddress.street.message}
            </p>
          )}

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
              {...register("clientAddress.city", {
                required: "Shahar nomini kiriting",
                minLength: {
                  value: 3,
                  message: "Kamida 3 ta harf bolishi kerak",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Faqat harflardan iborat bolishi kerak",
                },
              })}
              id="clientcity"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
            />

            {errors.clientAddress?.city && (
              <p className="text-red-500 text-sm">
                {errors.clientAddress.city.message}
              </p>
            )}

            <label
              htmlFor="clientpostcode"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              Post Code
            </label>

            <input
              {...register("clientAddress.postCode", {
                required: "Pochta kodini kiriting",
                pattern: {
                  value: /^[0-9]{5,6}$/,
                  message:
                    "Faqat raqam bolishi va 5-6 ta belgidan iborat bolishi kerak",
                },
              })}
              id="clientpostcode"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
            />

            {errors.clientAddress?.postCode && (
              <p className="text-red-500 text-sm">
                {errors.clientAddress.postCode.message}
              </p>
            )}

            <label
              htmlFor="clientcountry"
              className={`${
                darkMode ? "text-slate-300" : "text-slate-500"
              } font-medium font-spartan mb-1  `}
            >
              Country
            </label>

            <input
              {...register("clientAddress.country", {
                required: "Mamlakat nomini kiriting",
                minLength: {
                  value: 3,
                  message: "Kamida 3 ta harf bolishi kerak",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Faqat harflardan iborat blishi kerak",
                },
              })}
              id="clientcountry"
              className={`${
                darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
              } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
            />

            {errors.clientAddress?.country && (
              <p className="text-red-500 text-sm">
                {errors.clientAddress.country.message}
              </p>
            )}
          </div>

          <label
            htmlFor="clientname"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Issue Date
          </label>

          <input
            {...register("invoiceDate", {
              required: "Sanani tanlang",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                if (selectedDate > today) {
                  return "Kelajak sanani tanlash mumkin emas";
                }
                return true;
              },
            })}
            type="date"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
          />

          {errors.invoiceDate && (
            <p className="text-red-500 text-sm">{errors.invoiceDate.message}</p>
          )}

          <label
            htmlFor="payment"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Payment Terms
          </label>
          <select
            id="payment"
            {...register("paymentTerms", {
              required: "Tolov shartlarini tanlang",
            })}
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 appearance-none`}
          >
            <option value="Net 1 Days">Net 1 Days</option>
            <option value="Net 7 Days">Net 7 Days</option>
            <option value="Net 14 Days">Net 14 Days</option>
            <option value="Net 30 Days">Net 30 Days</option>
          </select>
          {errors.paymentTerms && (
            <p className="text-red-500 text-sm">
              {errors.paymentTerms.message}
            </p>
          )}
          <label
            htmlFor="description"
            className={`${
              darkMode ? "text-slate-300" : "text-slate-500"
            } font-medium font-spartan mb-1  `}
          >
            Project Description
          </label>

          <input
            {...register("description", {
              required: "Ta'rif maydoni bosh bolishi mumkin emas",
              minLength: {
                value: 5,
                message: "Ta'rif kamida 5 ta belgidan iborat bolishi kerak",
              },
            })}
            id="description"
            className={`${
              darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
            } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
          />

          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <h2 className="text-lg font-bold mb-4 text-slate-500 font-spartan mt-4">
            Item List
          </h2>
          {fields.map((item, index) => (
            <div key={item.id} className=" mb-4">
              <div className={`flex gap-2 `}>
                <div>
                  <label
                    htmlFor="itemname"
                    className={`${
                      darkMode ? "text-slate-300" : "text-slate-500"
                    } font-medium font-spartan mb-1  `}
                  >
                    Item Name
                  </label>

                  <input
                    {...register(`items.${index}.name`, {
                      required: "Mahsulot nomini kiriting",
                      minLength: {
                        value: 3,
                        message:
                          "Mahsulot nomi kamida 3 ta belgidan iborat bolishi kerak",
                      },
                    })}
                    id={`itemname-${index}`}
                    className={`${
                      darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                    } rounded-md w-full border py-3 px-2 outline-none mb-2 `}
                  />

                  {errors.items?.[index]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.items[index].name.message}
                    </p>
                  )}
                </div>
                <div key={item.id} className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <label
                      htmlFor={`items.${index}.quantity`}
                      className={`${
                        darkMode ? "text-slate-300" : "text-slate-500"
                      } font-medium font-spartan mb-1`}
                    >
                      Qty.
                    </label>
                    <input
                      {...register(`items.${index}.quantity`, {
                        required: "Qiymatni kiriting",
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: " Qiymat kamida 1 bolishi kerak",
                        },
                      })}
                      type="number"
                      className={`${
                        darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                      } rounded-md w-[60px] border py-3 px-2 outline-none mb-2`}
                    />

                    {errors.items?.[index]?.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.items[index].quantity.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`items.${index}.price`}
                      className={`${
                        darkMode ? "text-slate-300" : "text-slate-500"
                      } font-medium font-spartan mb-1`}
                    >
                      Price
                    </label>
                    <input
                      {...register(`items.${index}.price`, {
                        required: "Narxni kiriting",
                        valueAsNumber: true,
                        min: {
                          value: 0.01,
                          message: "Narx kamida 0.01 bolishi kerak",
                        },
                      })}
                      type="number"
                      step="0.01"
                      className={`${
                        darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                      } rounded-md w-[70px] border py-3 px-2 outline-none mb-2`}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className={`${
                        darkMode ? "text-slate-300" : "text-slate-500"
                      } font-medium font-spartan mb-1`}
                    >
                      Total
                    </label>
                    <input
                      {...register(`items.${index}.total`)}
                      readOnly
                      className={`${
                        darkMode ? "bg-[rgba(37,41,69,1)] border-none" : ""
                      } rounded-md w-[80px] border py-3 px-2 outline-none mb-2`}
                    />
                  </div>
                  <button type="button" onClick={() => remove(index)}>
                    <img
                      src={clearImage}
                      alt="Remove"
                      className="w-6 h-6 transition duration-300 hover:fill-red-700"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ name: "", quantity: 1, price: 0, total: 0 })
            }
            className={`${
              darkMode
                ? "bg-[rgba(37,41,69,1)] hover:bg-[#2c3051]"
                : "bg-slate-100 hover:bg-slate-200"
            }  text-slate-400 w-full py-3 rounded-full font-spartan font-bold `}
          >
            + Add Item
          </button>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                toast.success("O'zgartirishlar bekor qilindi!");
                setTimeout(() => navigate("/"), 2000);
              }}
              className={`${
                darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-100 hover:bg-slate-300"
              } text-slate-400 py-2 px-5 rounded-full font-bold font-spartan`}
            >
              {id ? "Cancel" : "Discard"}
            </button>
            {id ? (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className={`${
                  darkMode ? "bg-purple-800" : "bg-purple-600"
                } text-slate-50 px-6 font-bold font-spartan rounded-full hover:bg-purple-700`}
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
