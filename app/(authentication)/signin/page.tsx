// import { useRouter } from "next/router";
import LoginForm from "./LoginForm";

export default function Login() {
    // const router = useRouter();

    const handleLogin = async (credentials: { email: string; password: string }) => {
        // try {
        //     // Call backend login API (adjust URL as needed)
        //     const response = await fetch("/api/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //             username: credentials.email,
        //             password: credentials.password
        //         })
        //     });
        //     if (!response.ok) {
        //         throw new Error("Invalid credentials");
        //     }
        //     const data = await response.json();
        //     // Save token and user info in localStorage
        //     localStorage.setItem("token", data.token);
        //     localStorage.setItem("user", JSON.stringify(data.user || { email: credentials.email }));
        //     localStorage.setItem("authenticated", "true");
        //     router.push("/");
        // } catch (err) {
        //     alert("Login failed. Please check your credentials.");
        // }
    };

    return <LoginForm onLogin={handleLogin} />;
}
