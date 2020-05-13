import M from "materialize-css";
const imageEls = document.querySelectorAll(".materialboxed");
const imageInst = M.Materialbox.init(imageEls);
const dropDownELs = document.querySelectorAll(".dropdown-trigger");
const dropDownInst = M.Dropdown.init(dropDownELs, {
  coverTrigger: false,
  closeOnClick: true,
  constrainWidth: false,
});
const selectEls = document.querySelectorAll("select");
const selectInst = M.FormSelect.init(selectEls);
const modalEls = document.querySelectorAll(".modal");
const modalInst = M.Modal.init(modalEls, {
  preventScrolling: true,
  startingTop: "10%",
});

export { selectInst, modalInst };
