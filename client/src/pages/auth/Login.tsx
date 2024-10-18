import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Lock, MailIcon } from "lucide-react";
import { loginApiCall } from "@/lib/api";
import { useState } from "react";

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useNavigate();
  const [error, seterror] = useState("");
  const validate = (values: LoginValues) => {
    const errors: Partial<LoginValues> = {};
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    }
    return errors;
  };

  const onLogin = async (values: any) => {
    const data: any = await loginApiCall(values);
    if (data.status == 201) {
      router("/dashboard");
      localStorage.setItem("token", data.data.access_token);
    } else if (data.status == 500) {
      seterror("Invalid userEmail or password");
    }
  };

  const handleSubmit = (values: LoginValues) => {
    onLogin(values);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 ">
              <h1 className="text-center font-medium text-lg">LOGIN PAGE</h1>

              {error && (
                <div className="text-center bg-red-500 text-white py-2 px-5 font-medium text-md">
                  {error}
                </div>
              )}
              <div className="w-72">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="w-72">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="********"
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="mt-1 text-sm text-red-600">
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                >
                  {"Log In"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
