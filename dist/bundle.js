document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input, textarea").forEach(function (t) {
    t.addEventListener("input", function () {
      "" !== t.value.trim()
        ? t.classList.add("notEmpty")
        : t.classList.remove("notEmpty");
    });
  });
});
