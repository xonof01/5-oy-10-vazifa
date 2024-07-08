let products = JSON.parse(localStorage.getItem("cart"));

console.log(products);

const ul = document.querySelector("ul");

products.forEach((prod) => {
  console.log(prod);
  const product = `<li>
     <img src=${prod.attribute.image} width="200"/>
    <h3>${prod.attribute.title}</h3>
    <p>count: ${prod.count}</p>
  </li>`;

  ul.innerHTML += product;
});
