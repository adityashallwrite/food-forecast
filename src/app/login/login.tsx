"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { UserRole } from "@/types/auth";

export default function Login() {
    const router = useRouter();
    const [role, setRole] = useState<UserRole>("student");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error ?? "That username or password is not valid.");
                return;
            }

            router.push("/dashboard");
        } catch {
            setError("Unable to sign in right now. Please try again.");
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f2ea] px-6 py-12 text-[#1e2822]">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d8e4d2]" />
            <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#ead8bc]" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#dfe3d9] bg-white shadow-[0_24px_80px_rgba(40,55,43,0.12)] md:grid-cols-[0.9fr_1.1fr]">
                <section className="flex flex-col justify-between bg-[#284b3a] p-8 text-[#f8f7f1] md:p-12">
                    <div>
                        <div className="mb-16 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#d8e4d2] text-[#284b3a]">
                                <Utensils className="size-5" />
                            </span>
                            Food Forecast
                        </div>
                        <p className="mb-4 text-sm font-medium tracking-[0.16em] text-[#d8e4d2] uppercase">
                            Mess intelligence
                        </p>
                        <h1 className="max-w-sm text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                            Better meals start with better signals.
                        </h1>
                    </div>
                    <div className="mt-16 flex items-center gap-3 text-sm text-[#d8e4d2]">
                        <ShieldCheck className="size-5" />
                        A calmer way to plan every service.
                    </div>
                </section>

                <section className="p-8 md:p-12">
                    <div className="mb-10">
                        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#edf3e9] text-[#284b3a]">
                            <LockKeyhole className="size-5" />
                        </div>
                        <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
                        <p className="mt-2 text-sm text-[#69746b]">Sign in to manage your food forecast.</p>
                    </div>

                    <ButtonGroup className="mb-8 grid w-full grid-cols-3" orientation="horizontal">
                        <Button
                            type="button"
                            variant={role === "student" ? "default" : "outline"}
                            onClick={() => { setRole("student"); setError(""); }}
                        >
                            Student
                        </Button>
                        <Button
                            type="button"
                            variant={role === "faculty" ? "default" : "outline"}
                            onClick={() => { setRole("faculty"); setError(""); }}
                        >
                            Faculty
                        </Button>
                        <Button
                            type="button"
                            variant={role === "admin" ? "default" : "outline"}
                            onClick={() => { setRole("admin"); setError(""); }}
                        >
                            Admin
                        </Button>
                    </ButtonGroup>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="username">Username</label>
                            <Input
                                id="username"
                                autoComplete="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
                        <Button className="h-11 w-full gap-2" type="submit">
                            Sign in
                            <ArrowRight className="size-4" />
                        </Button>
                    </form>
                </section>
            </div>
        </main>
    );
}