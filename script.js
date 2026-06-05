let items = [];

function addItem() {

    const name =
        document.getElementById("itemName").value.trim();

    const price =
        Number(document.getElementById("itemPrice").value);

    const qty =
        Number(document.getElementById("itemQty").value);

    if (!name || price <= 0 || qty <= 0) {
        alert("Please enter valid data");
        return;
    }

    const total = price * qty;

    items.push({
        name,
        price,
        qty,
        total
    });

    renderTable();

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQty").value = "";
}

function deleteItem(index){

    items.splice(index,1);

    renderTable();
}

function renderTable(){

    const body =
        document.getElementById("billBody");

    body.innerHTML = "";

    let grandTotal = 0;

    items.forEach((item,index)=>{

        grandTotal += item.total;

        body.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.qty}</td>
            <td>₹${item.total}</td>
            <td>${item.total.toString(2)}</td>
            <td>${item.total.toString(16).toUpperCase()}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteItem(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("grandTotal")
        .innerText = `₹${grandTotal}`;

    document.getElementById("binaryTotal")
        .innerText = grandTotal.toString(2);

    document.getElementById("hexTotal")
        .innerText = grandTotal.toString(16).toUpperCase();
}