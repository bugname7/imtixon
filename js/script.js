const logoUrl = document.querySelector("#logoUrl").value;
const companyName = document.querySelector("#companyName").value;
const position = document.querySelector("#position").value;
const time = document.querySelector("#time").value;
const jobType = document.querySelector("#jobType").value;
const location = document.querySelector("#location").value;
const salary = document.querySelector("#salary").value;
if (
  !logoUrl ||
  !companyName ||
  !position ||
  !time ||
  !jobType ||
  !location ||
  !salary
) {
  alert("malumot toliq emas?");
  return;
}
