const addButton = document.querySelector("Cartadd");

addButton.forEach(button => {
    button.addEventListener("click", () => {
        const pid= button.dataset.pid;
        const cid = button.dataset.cid;

        fetch(`http://localhost:8080/api/carts/${cid}/products/${pid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.payload.status === 200) {
                Toastify({
                    text: "Product added to cart.",
                    duration: 3000,
                    destination: `http://localhost:8080/api/carts/${cid}`,
                    newWindow: false,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { }
                }).showToast();
                }
        })
        .catch((err) => {
            console.error("Fetch catch, Error al agregar al carrito:", err);
        })
    })
})