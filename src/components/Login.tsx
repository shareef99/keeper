import "../styles/pages/login.scss";

interface Props {}

const Login = (props: Props) => {
    return (
        <section className="fullHeight colCenter">
            <div className="border-[3px] border-gray-600 px-4 py-8 rounded shadow-xl bg-gray-200">
                <div>
                    <div>
                        <button>Login with Google</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
