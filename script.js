const itemPrices = {
  Rice: 50.00,
  Sugar: 45.00,
  Tea: 30.00,
  Coffee: 180.00,
  "Coca Cola": 40.00,
  Pepsi: 40.00,
  Sprite: 40.00,
  Chips: 20.00,
  Cookies: 25.00,
  Popcorn: 35.00,
  Cake: 120.00,
  Brownie: 100.00,
  "Ice Cream": 60.00,
};

let items = [];

// Auto-fill price when item is selected
document
  .getElementById("itemName")
  .addEventListener("change", function () {
    const selectedItem = this.value;

    document.getElementById("itemPrice").value =
      itemPrices[selectedItem] || "";
  });

function addItem() {
  const name = document
    .getElementById("itemName")
    .value
    .trim();

  const price = parseFloat(
    document.getElementById("itemPrice").value
  );

  const qty = parseInt(
    document.getElementById("itemQty").value
  );

  if (!name || !price || qty <= 0) {
    alert("Please enter valid data");
    return;
  }

  const existingItem = items.find(
    (item) => item.name === name
  );

  if (existingItem) {
    existingItem.qty += qty;
    existingItem.total =
      existingItem.price * existingItem.qty;
  } else {
    items.push({
      name,
      price,
      qty,
      total: price * qty,
    });
  }

  renderTable();

  document.getElementById("itemName").selectedIndex = 0;
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemQty").value = "";
}

function deleteItem(index) {
  if (confirm("Delete this item?")) {
    items.splice(index, 1);
    renderTable();
  }
}

function renderTable() {
  const body =
    document.getElementById("billBody");

  body.innerHTML = "";

  let grandTotal = 0;

  if (items.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="7">
          No Items Added Yet
        </td>
      </tr>
    `;

    document.getElementById(
      "grandTotal"
    ).innerText = "₹0.00";

    document.getElementById(
      "binaryTotal"
    ).innerText = "0";

    document.getElementById(
      "hexTotal"
    ).innerText = "0";

    return;
  }

  items.forEach((item, index) => {
    grandTotal += item.total;

    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>${item.qty}</td>
        <td>₹${item.total.toFixed(2)}</td>
        <td>${Math.floor(item.total).toString(2)}</td>
        <td>${Math.floor(item.total)
          .toString(16)
          .toUpperCase()}</td>

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

  document.getElementById(
    "grandTotal"
  ).innerText = `₹${grandTotal.toFixed(2)}`;

  document.getElementById(
    "binaryTotal"
  ).innerText = Math.floor(grandTotal).toString(2);

  document.getElementById(
    "hexTotal"
  ).innerText = Math.floor(grandTotal)
    .toString(16)
    .toUpperCase();
}