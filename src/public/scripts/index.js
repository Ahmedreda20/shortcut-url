(() => {
  const form = document.querySelector('[data-type="generator-form"]');
  const errorElement = document.querySelector('[data-type="error"]');
  const successElement = document.querySelector('[data-type="success"]');

  const inputDisabledOptions = [
    ["readnonly", "true"],
    ["disabled", "true"],
  ];
  const buttonDisabledOptions = [["disabled", "true"]];
  const inputUnDisabledOptions = [
    ["readnonly", "false"],
    ["disabled", "false"],
  ];
  const buttonUnDisabledOptions = [["disabled", "false"]];

  form.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      const input = this.querySelector("input");
      const button = this.querySelector("button");

      SetAttributes(inputDisabledOptions, input);
      SetAttributes(buttonDisabledOptions, button);

      errorElement.innerHTML = null;
      successElement.innerHTML = null;
      errorElement.classList.add("hidden");
      successElement.classList.add("hidden");

      button.innerHTML = null;
      button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

      const response = await Fetch({ url: input.value });
      const res = await response.json();
      const result = res.result;

      if (res.status !== 200) {
        errorElement.innerHTML = result.message;
        errorElement.classList.remove("hidden");
      } else {
        successElement.innerHTML = result.url;
        successElement.classList.remove("hidden");
      }

      RemoveAttributes(inputDisabledOptions, input);
      RemoveAttributes(buttonDisabledOptions, button);
      button.innerHTML = "Submit";
    } catch (error) {
      console.log("error while fetching...", error);
    }
  });
})();

function SetAttributes(arr, element) {
  for (const item of arr) {
    element.setAttribute(item[0], item[1]);
  }
}
function RemoveAttributes(arr, element) {
  for (const item of arr) {
    element.removeAttribute(item[0]);
  }
}

function Fetch(body) {
  return fetch("/api/url/generate", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
