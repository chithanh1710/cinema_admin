import { Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/LoginContext";

export default function Login() {
  const navigate = useNavigate();
  const {
    checkLogin,
    setPassword,
    setUsername,
    isAuthenticated,
    errorPassword,
    errorUsername,
  } = useLogin();
  console.log(isAuthenticated);

  if (isAuthenticated) return <Navigate to="/dashboard" replace={false} />;
  else
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <form className="w-[600px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center p-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="size-32 mb-4 bg-black mx-auto">LOGO</div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold" htmlFor="username">
                Tài khoản
              </label>
              <input
                onChange={(e) => setUsername(e.currentTarget.value)}
                className="bg-gray-100 outline-none px-2"
                type="text"
                name="username"
                id="username"
                placeholder="admin"
              />
              {errorUsername && <p className="text-red-600">{errorUsername}</p>}
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-lg font-semibold" htmlFor="password">
                Mật khẩu
              </label>
              <input
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="bg-gray-100 outline-none px-2"
                type="password"
                name="password"
                id="password"
                placeholder="******"
              />
              {errorPassword && <p className="text-red-600">{errorPassword}</p>}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (checkLogin()) {
                  return navigate("/dashboard");
                }
              }}
              className="bg-gray-500 text-white font-medium text-lg py-2 rounded-md"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    );
}
