export type LoginPayload = {
    email: string;
    password: string;
};

export type LoginResponse = {
    message?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    [key: string]: unknown;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    const data = (await response.json().catch(() => ({}))) as LoginResponse;

    if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
    }

    return data;
}

export async function getProfile(): Promise<LoginResponse> {
    const response = await fetch(`/api/auth/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // ← sends your auth cookie (token) automatically
    });

    const data = (await response.json().catch(() => ({}))) as LoginResponse;

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }

    return data;
}

export async function logout(): Promise<void> {
    await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });
}