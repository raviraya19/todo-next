import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const ModalDialog = ({ data, isOpen, setIsOpen, formVal }: any) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      completed: false,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values, "submitted!");
      // handle submission
      setIsOpen(false);
      formVal({ form_val: values, form_type: data.name });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (data.name === "Edit Task") {
      formik.setValues(data.values);
    }
  }, [data]);

  const closeDialog = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog()}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white shadow-lg p-5">
          <Dialog.Title className="text-xl text-center font-medium">
            {data.name}
          </Dialog.Title>
          <form className="register-form" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <label className="text-gray-600 font-bold inline-block pb-2">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="text"
                  placeholder="e.g, study for the test"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-700">{formik.errors.title}</div>
                ) : null}
              </div>
              <div>
                <label className="text-gray-600 font-bold inline-block pb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  placeholder="e.g, study for the test"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-700">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="inline-flex items-center mt-3">
                  <input
                    id="completed"
                    name="completed"
                    type="checkbox"
                    value={formik.values.completed.toString()}
                    checked={formik.values.completed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-checkbox h-5 w-5 text-red-600"
                  />
                  <span className="ml-2 text-gray-600 font-bold">Completed</span>
                </label>
              </div>
              <div className="flex justify-center  space-x-2">
              <button
                className="text-white bg-red-500 font-medium rounded mx-2 mt-8 py-2 px-5"
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                }}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue font-medium rounded mx-2 mt-8 py-2 px-5"
                type="submit"
              >
                Submit
              </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalDialog;
