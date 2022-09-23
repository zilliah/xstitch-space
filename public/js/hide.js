const designerForm = document.querySelector("#designer");

document.querySelector("#designer-yes").addEventListener("click", () => designerForm.classList.remove("hide"));
document.querySelector("#designer-no").addEventListener("click", () => designerForm.classList.add("hide"));
