// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem("so-cart-count", JSON.stringify(getLocalStorage("so-cart")?.length || 0));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);  // uses the template to convert data into HTML
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));  // inserts HTML at the specified location

}

export function renderWithTemplate(template, parentElement, data, callback) {

  parentElement.innerHTML = "";
  let clone = template.content.cloneNode(true);

  if (data) {
    clone = template.content.cloneNode(true);
  }
  parentElement.appendChild(clone);

  if (callback) {
    callback();
  }


  // const htmlStrings = list.map(templateFn);  // uses the template to convert data into HTML
  // parentElement.insertAdjacentHTML(position, htmlStrings.join(""));  // inserts HTML at the specified location

}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const text = await res.text();
  const template = document.createElement('template');
  template.innerHTML = text;
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  const main = document.querySelector('main');
  const alert = document.createElement('div');
  alert.classList.add('alert-box');
  alert.innerHTML = `
    <div class="alert">
      <p>${message}</p>
    </div>
  `;

  // Clear any existing alerts first
  const existingAlert = document.querySelector('.alert-box');
  if (existingAlert) {
    existingAlert.remove();
  }

  main.prepend(alert);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
