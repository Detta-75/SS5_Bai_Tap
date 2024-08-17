class Product {
    constructor(name, price, describe, img, status) {
        this.name = name;
        this.price = price;
        this.describe = describe;
        this.img = img;
        this.status = status;
    }
}

class ProductManager {
    constructor(products = []) {
        this.products = products;
    }

    addProduct(name, price, describe, img, status) {
        let product = new Product(name, price, describe, img, status);
        this.products.push(product);
        this.displayProduct();
    }

    displayProduct() {
        let table = document.getElementById("product-list");
        table.innerHTML = `
            <tr>
                <th style="font-size: 40px" colspan="8">Menu</th>
            </tr>
            <tr>
                <th>TT</th>
                <th>Ảnh</th>
                <th>Tên món ăn</th>
                <th>Mô tả món ăn</th>
                <th>Tình trạng</th>
                <th>Giá</th>
                <th colspan="2">Tùy chọn</th>
            </tr>
        `;
        this.products.forEach((product, index) => {
            let str = `
                <tr>
                    <td>${index + 1}</td>
                    <td><img src="${product.img}" width="50" alt="${product.name}"></td>
                    <td>${product.name}</td>
                    <td>${product.describe}</td>
                    <td>${product.status}</td>
                    <td>${product.price} VND</td>
                    <td>
                        <button onclick="productManager.deleteProduct(${index})" class="btn btn-danger">Delete</button>
                    </td>
                    <td>
                        <button onclick="productManager.updateProduct(${index})" class="btn btn-warning">Edit</button>
                    </td>
                </tr>
            `;
            table.innerHTML += str;
        });
    }

    deleteProduct(index) {
        let check = confirm("Are you sure to delete " + productManager[index]);
        if (check) {
            this.products.splice(index, 1);
            alert("Delete successfully");
        }
        this.displayProduct();
        let button = document.getElementById('button');
        if (button.innerText === "Save") {
            button.innerText = "Add";
            button.setAttribute("onclick", "addNewProduct()");
            this.resetProduct();
        }
    }

    updateProduct(index) {
        let product = this.products[index];
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("describe").value = product.describe;
        document.getElementById("img").value = product.img;
        document.querySelector(`input[name="status"][value="${product.status}"]`).checked = true;
        let button = document.getElementById('button');
        button.innerText = "Save";
        button.setAttribute("onclick", `productManager.saveProduct(${index})`);
    }

    saveProduct(index) {
        this.products[index].name = document.getElementById("name").value;
        this.products[index].price = document.getElementById("price").value;
        this.products[index].describe = document.getElementById("describe").value;
        this.products[index].img = document.getElementById("img").value;
        this.products[index].status = document.querySelector('input[name = "status"]:checked').value;
        let button = document.getElementById('button');
        button.innerText = "Add";
        button.setAttribute("onclick", "addNewProduct()");

        this.displayProduct();
        this.resetProduct();
    }

    resetProduct() {
        document.getElementById("name").value = '';
        document.getElementById("price").value = '';
        document.getElementById("describe").value = '';
        document.getElementById("img").value = '';
        document.querySelector('input[name="status"]:checked').checked = false;
    }
}
let product1 = new Product(
    "Bibimbap",
    "120000",
    "Bibimbap là món cơm trộn với rau củ, thịt, trứng, và tương ớt Gochujang. Món ăn này nổi tiếng nhờ sự kết hợp hài hòa giữa các loại nguyên liệu.",
    "https://www.shutterstock.com/image-photo/korean-bibimbap-top-view-isolated-600nw-2488434069.jpg",
    "Còn hàng"
);
let product2 = new Product(
    "Bulgogi",
    "300000",
    "Bulgogi là thịt bò marinated (ướp) với nước tương, tỏi, đường, và dầu mè, sau đó nướng hoặc xào. Thịt bò mềm và có vị ngọt đặc trưng.",
    "https://media.istockphoto.com/id/926774114/vi/anh/th%E1%BB%8Bt-n%C6%B0%E1%BB%9Bng-t%E1%BB%B1-l%C3%A0m-th%E1%BB%8Bt-b%C3%B2-h%C3%A0n-qu%E1%BB%91c-bulgogi.jpg?s=612x612&w=0&k=20&c=qm2GBhpB0076vlfRQPt_b-YwFRgk0q7_maS2IdLU3NY=",
    "Còn hàng"
);
let product3 = new Product(
    "Tteokbokki",
    "100000",
    "Tteokbokki là món bánh gạo Hàn Quốc được nấu với sốt ớt đỏ, đường và đôi khi có thêm cá viên hoặc trứng luộc. Món ăn này thường có vị cay ngọt.",
    "https://busanfoods.com/wp-content/uploads/2020/07/Banh-gao-cay-tokbokki%E2%80%93qu%C3%A1n-busan-foods.jpg",
    "Còn hàng"
);
let productManager = new ProductManager([product1,product2,product3]);
productManager.displayProduct();
function addNewProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let describe = document.getElementById("describe").value;
    let img = document.getElementById("img").value;
    let status = document.querySelector('input[name="status"]:checked').value;

    productManager.addProduct(name, price, describe, img, status);
    productManager.resetProduct();
}

