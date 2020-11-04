const m_buttons = document.getElementsByClassName("btn-delete");
const m_calcButton = document.getElementById("calcButton");
const m_productLissDiv = document.getElementById("productList");

const m_createProductButton = document.getElementById("createButton");

const deleteItem = (i) => {
    document.getElementById("con" + i).remove();
}

const getPriceByProduct = (itemNode) => {

}

const updatePriceByProduct = (productPrice, index) => {

}

const getTotalPrice = () => {

}

const createQuantityInput = () => {

}

const createDeleteButton = () => {

}

const createQuantityNode = () => {

}

const createItemNode = (name, price, i) => {

    let l_result = 
    `<div class="container" id="con${i}">
        <div>
            <span>
            <p class="productName${i}">${name}</p>
            </span>
        </div>
        <div>
            <span>
            <p id="unitCost${i}">$${price}</p>
            </span>
        </div>
        <div>
            <label for="">QTY:</label>
            <input class = "qtyInput" id="qty${i}" type="number" min="0" placeholder="0">
        </div>
        <div>
            <span>
            <p class = "totalCost" id="totalCost${i}">$0</p>
            </span>
        </div>
        <div>
            <button onclick="onDeleteButton(${i})" id="product${i}" class="btn-delete">Delete</button>
        </div>
    </div>`;

    m_productLissDiv.innerHTML += l_result;
}

const createNewItem = (product, i) => {
    createItemNode(product.name, product.price, i);
}

const onCalculatePrice = () => {
    let m_prices = document.getElementsByClassName("totalCost");
    let l_result = 0;
    for (let i = 0; i < m_prices.length; i++) {
        let l_elementID = m_prices[i].id.slice(9);

        if (m_prices[i] != null) 
        {
            let l_element = document.getElementById("totalCost" + l_elementID).innerHTML.slice(1);
            if (l_element > 0)
                l_result += (parseInt(l_element));
        }
        else
            continue;
    }

    document.getElementById("totalPrice").innerHTML = l_result;
}

const onInputValueChange = (e) => {

    let l_id = e.target.id.slice(3);
    let l_cost = document.getElementById("unitCost" + l_id).innerHTML.slice(1);
    let l_element = document.getElementById("totalCost" + l_id);


    l_element.innerHTML = `$${e.target.value * parseInt(l_cost)}`
}
const onCreateButton = () => {
    const l_name = document.getElementById("createName").value;
    const l_price = document.getElementById("createPrice").value;

    if (l_price != "" && l_name != "") {
        createItemNode(l_name, l_price, m_inputs.length);
        m_inputs = document.getElementsByClassName("qtyInput");

        for (let i = 0; i < m_inputs.length; i++)
            m_inputs[i].addEventListener('change', onInputValueChange);
    }
}
const onDeleteButton = (e) => {
    let l_id = e;
    deleteItem(l_id);
}


//Read JSON file
let m_products = [];
m_productDATA = "https://raw.githubusercontent.com/JaumeGarciaBit/carrito-dela-compra/master/docs/data/products.json";
let m_promise = fetch(m_productDATA);
m_promise.then(response => response.json())
        .then(data =>
        {            
            let l_index =0;
            data.forEach(e =>
                {
                    m_products.push(e);

                    createNewItem(e, l_index);
                    l_index++;
                })
        })

let m_inputs = document.getElementsByClassName("qtyInput");
let m_deleteButtons = document.getElementsByClassName("btn-delete");

//Init web


for (let i = 0; i < m_inputs.length; i++) {
    m_inputs[i].addEventListener('change', onInputValueChange)
}

addEventListener = ('load', () => {
    m_calcButton.addEventListener('click', onCalculatePrice);
    m_createProductButton.addEventListener('click', onCreateButton);
});
