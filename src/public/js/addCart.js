document.addEventListener('DOMContentLoaded', () => {
const addToCartButtons = document.querySelectorAll('addCart')
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            fetch(`api/tickets/${productId}/purchase`, {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response is:', data);
                })
                .catch(error => {
                    console.error('Error adding product to cart:', error);
                });
                
        });
    });
})