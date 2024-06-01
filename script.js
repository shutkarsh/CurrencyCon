console.log("HORN OK");

const populate = async (value, base) => {
  let myStr = "";
  url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_qMYB2TE8orVStLBegBowSxxwbFn4hy6qJNC2EBVx&base_currency=" +
    base;
  let response = await fetch(url);
  let rJson = await response.json();
  console.log(rJson);
  for (let key of Object.keys(rJson["data"])) {
    myStr += `
    <tr>
    <td>${key}</td>
    <td>${rJson["data"][key]["code"]}</td>
    <td>${rJson["data"][key]["value"] * value}</td>
    </tr>`;
  }
  const TableBody = document.querySelector("tbody");
  TableBody.innerHTML = myStr;
}; //To show whole table of many converted currencies.

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const value = parseInt(
    document.querySelector("input[name='quantity']").value
  );
  const currency = document.querySelector("select[name = 'currency']").value;
  //populate(value, currency);
  spexConverter(value, currency);
});

const spexConverter = async (value, currency) => {
  url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_qMYB2TE8orVStLBegBowSxxwbFn4hy6qJNC2EBVx&base_currency=" +
    currency;
  let response = await fetch(url);
  let rJson = await response.json();
  const spexcurrency = document.querySelector(
    "select[name = 'spexcurrency']"
  ).value;
  for (let key of Object.keys(rJson["data"])) {
    if (rJson["data"][key]["code"] == spexcurrency) {
      document.getElementById("specific-converted-amt").innerHTML =
        rJson["data"][key]["value"] * value;
    }
  }
}; //For a specific conversion only.
