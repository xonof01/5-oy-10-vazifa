import { getDate, createDateils } from "./functions.js";
const dateils = document.getElementById("dateils");

let dataFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  let id = url.split("id=")[1];

  if (!id) {
    window.location.assign("http://127.0.0.1:5500/index.html");
    return;
  }

  getDate(`https://strapi-store-server.onrender.com/api/products/${id}`)
    .then((data) => {
      console.log(data);
      if (data.data.id) {
        const card = createDateils(data.data);
        dateils.innerHTML = card;

        const form = document.querySelector("form");
        const button = document.querySelector("button");
        const select = document.querySelector("select");

        button.addEventListener("click", (e) => {
          const cartTitle =
            e.target.parentElement.parentElement.children[0].textContent;
          console.log(cartTitle);
        });

        form.addEventListener("submit", function (event) {
          event.preventDefault();
          let product = {
            id: data.data.id,
            time: Date.now(),
            count: select.value,
            attribute: data.data.attributes,
          };

          if (dataFromLocalStorage.length == 0) {
            dataFromLocalStorage.push(product);
            localStorage.setItem("cart", JSON.stringify(dataFromLocalStorage));
            dataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
          } else {
            const element = dataFromLocalStorage.find(
              (item) => item.id == product.id
            );

            if (element) {
              const addNewItem = dataFromLocalStorage.map((prod) => {
                if (prod.id == product.id) {
                  return {
                    ...prod,
                    count: Number(product.count) + Number(prod.count),
                  };
                } else {
                  return prod;
                }
              });
              dataFromLocalStorage = addNewItem;
              localStorage.setItem(
                "cart",
                JSON.stringify(dataFromLocalStorage)
              );
            } else {
              dataFromLocalStorage = [...dataFromLocalStorage, product];

              localStorage.setItem(
                "cart",
                JSON.stringify(dataFromLocalStorage)
              );
            }
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
