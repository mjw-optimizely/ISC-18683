const appId = "***REMOVED***";
const locationId = "***REMOVED***";

document.addEventListener("DOMContentLoaded", async function () {
    if (!window.Square) {
        throw new Error("Square.js failed to load properly");
    }

    let payments;
    try {
        payments = window.Square.payments(appId, locationId);
    } catch {
        alert("Error");
    }

    const card = await payments.card();
    await card.attach("#card-container");

    const cardButton = document.getElementById("card-button");
    cardButton.addEventListener("click", async function (event) {
        cardButton.disabled = true;
        const nonce = document.getElementById("nonce-token");
        let tokenResult;
        try {
            tokenResult = await card.tokenize();
            nonce.innerHTML = `<p>Nonce/token: <span style="color:green">${tokenResult.token}</span></p>`;
        } catch (err) {
            nonce.innerHTML = `<p>Error: <span style="color:red">${err.message}<span></p>`;
        }
    });
});
