let appId;
let locId;

document.addEventListener("DOMContentLoaded", async function () {
    if (!window.Square) {
        throw new Error("Square.js failed to load properly");
    }

    const cardButton = document.getElementById("card-button");
    const varButton = document.getElementById("var-button");
    const form = document.getElementById("input-form");

    varButton.addEventListener("click", async function (event) {
        const applicationId = document.getElementById("appId");
        const locationId = document.getElementById("locId");

        if (applicationId.value == "" || locationId.value == "") {
            const status = document.getElementById("status");
            status.innerHTML = `<p>(This won't work unless you fill in the application and location ID...)</p>`;
            return;
        }

        appId = applicationId.value;
        locId = locationId.value;

        varButton.style.display = "none";
        form.style.display = "none";

        await goTokenize();
    });
});

async function goTokenize() {
    let payments;
    try {
        payments = window.Square.payments(appId, locId);
    } catch {
        const status = document.getElementById("status");
        status.innerHTML = `<p>(That didn't work. Check your appId and locId values.)</p>`;
        return;
    }

    const cardButton = document.getElementById("card-button");
    cardButton.style.display = "block";

    const card = await payments.card();
    await card.attach("#card-container");

    cardButton.addEventListener("click", async function (event) {
        cardButton.style.display = "none";
        const status = document.getElementById("status");
        let tokenResult;
        try {
            tokenResult = await card.tokenize();
            status.innerHTML = `<p>Nonce/token: <span style="color:green">${tokenResult.token}</span></p>`;
        } catch (err) {
            status.innerHTML = `<p>Error: <span style="color:red">${err.message}<span></p>`;
        }
    });
}
