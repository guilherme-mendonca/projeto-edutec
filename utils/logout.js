export function logout() {
    const button = document.querySelector("button")
    button.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.reload()
    })
}