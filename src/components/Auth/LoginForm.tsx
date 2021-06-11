import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { LoginFormValues } from "../../interface";
import * as Yup from "yup";

interface Props {}

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Must provide email"),
    password: Yup.string()
        .required("Please enter password")
        .min(4, "Too Short")
        .max(20, "Too Long"),
});

const LoginForm = (props: Props) => {
    const initialValues: LoginFormValues = { email: "", password: "" };

    const handleSubmit = (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
        console.log(values);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            <Form className="space-y-8" autoComplete="off">
                <div className="">
                    <Field
                        id="email"
                        name="email"
                        placeholder="Email address"
                        className="focus:outline-none focus:border-b-[3px] border-black bg-transparent
                                pb-1"
                        autoComplete="false"
                    />
                    <ErrorMessage name="email">
                        {(err) => <div>{err}</div>}
                    </ErrorMessage>
                </div>
                <div>
                    <Field
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="focus:outline-none focus:border-b-[3px] border-black bg-transparent
                        pb-1"
                    />
                    <ErrorMessage name="password">
                        {(err) => <div>{err}</div>}
                    </ErrorMessage>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
