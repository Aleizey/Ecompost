export function logout() {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    )?.content;

    if (!csrfToken) {
        console.error("No CSRF token found.");
        return;
    }

    fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
    })
        .then((response) => {
            window.location.href = "/login"; 
        })
        .catch((error) => {
            console.error("Error en la solicitud de logout:", error);
            window.location.href = "/login";
        });
}
