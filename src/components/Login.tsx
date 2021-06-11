import { useAuth } from "../context/AuthContext";
import "../styles/pages/login.scss";
import LoginForm from "./Auth/LoginForm";

interface Props {}

const Login = (props: Props) => {
    const { login } = useAuth();

    return (
        <section className="fullHeight colCenter">
            <div className="container">
                <div className="colCenter border-[3px] border-gray-600 px-4 py-8 rounded shadow-xl bg-gray-200">
                    <div>
                        <LoginForm />
                    </div>
                    <div>
                        <button onClick={login}>Login with Google</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
