let m_submitButton = document.getElementById("addButton");
let m_deleteButton = document.getElementById("removeButton");
let m_sortButton   = document.getElementById("sortButton");
let m_buyButton    = document.getElementById("buyButton");

let m_selector         = document.getElementsByClassName("productSelect")[0];
let m_rankingContainer = document.getElementById("rankingContainer");

//Read JSON file
let m_products = [];
let m_productDATA = "https://raw.githubusercontent.com/JaumeGarciaBit/carrito-dela-compra/master/docs/data/products.json";
let m_promise = fetch(m_productDATA);
m_promise.then(response => response.json()) //Read JSON
    .then(data => {
        data.forEach(e => {
            m_products.push(e);
        })
        //Add events to buttons
        m_deleteButton.addEventListener('click', removeProductForm);
        m_submitButton.addEventListener('click', addProductForm);
        m_sortButton.addEventListener('click', orderProduct);
        m_buyButton.addEventListener('click', buyProduct);

        listStock();
        buyProduct();
    })


let m_shoppingList = [];
let m_stockContainer = document.getElementsByClassName("stockList")[0];

function listStock() {
    m_stockContainer.innerHTML = "";
    for (let i = 0; i < m_products.length; i++) {
        const l_element = m_products[i];
        writeProduct(l_element);
        setSelectorValues();
    }
}

function writeProduct(product) {
    let l_result =
        `<li><p class="productP">${product._id}</p> <p>${product.name}</p> <p>${product.category}</p> <p id="qty${product._id}">${product.quantity}</p></li>`

    m_stockContainer.innerHTML += l_result;
}

function demandProduct(product, quantity) {
    if (quantity === undefined || quantity == 0)
        quantity = Math.floor(Math.random() * 30 + 1);

    product.quantity += quantity;

    return product;
}

function loadStock(product) {
    if (!m_products.includes(product)) {
        m_products.push(product);
        listStock();
    }
    else {
        let l_element = document.getElementById("qty" + product._id);
        l_element.textContent = product.quantity;
    }
}

const addProductForm = () => {
    let l_name = document.forms["productForm"]["fname"].value;
    let l_category = document.forms["productForm"]["fcategory"].value;
    let l_index = m_products.length;
    let l_id = "5ced8cb95006e39827170z" + Math.floor(Math.random() * 1000);;
    let l_quantity = Math.floor(Math.random() * 30) + 1;

    let l_element =
    {
        _id: l_id,
        index: l_index,
        name: l_name,
        category: l_category,
        quantity: l_quantity,
    }

    loadStock(l_element)
    return false;
};

const removeProductForm = () => {
    let l_index = document.forms["RemoveForm"]["findex"].value;

    m_products.splice(l_index, 1);
    listStock();
};

function setSelectorValues() {
    m_selector.innerHTML = "";

    for (let element of m_products) {
        let l_option = document.createElement("option");
        l_option.setAttribute("value", element._id);
        l_option.innerHTML = element.name;
        m_selector.appendChild(l_option);
    }

}

function orderProduct() {
    m_products.sort(function (a, b) {
        if (a.quantity > b.quantity)
            return 1;
        else if (a.quantity < b.quantity)
            return -1;
        else
            return 0;
    });

    listStock();
}

function buyProduct() {

    let l_buyableProduct;
    for (let e of m_products)
        if (e._id == m_selector.value)
            l_buyableProduct = e;
    
    let l_amount = document.forms["buyForm"]["famount"].value;
    if(l_amount != "" && l_amount > 0)
        if(l_buyableProduct.quantity >= l_amount)
        {
            l_buyableProduct.quantity -= l_amount;
            m_shoppingList.push(l_buyableProduct);
            updateRanking(l_buyableProduct);
            listStock();
        }
}

function updateRanking(product)
{
    let l_li = document.createElement("li");
    l_li.innerHTML = product.name;
    m_rankingContainer.appendChild(l_li);
}

