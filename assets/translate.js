/* Language picker for the policy pages (Google Website Translator).
   - The page lists its languages in <main data-langs="en,ta,...">.
   - Opening the page as ?lang=ta (for example from the app) translates it automatically.
   Pages without data-langs load nothing from Google. */
(function () {
  var main = document.querySelector("main[data-langs]");
  if (!main) return;
  var langs = main.getAttribute("data-langs");

  var wanted = new URLSearchParams(window.location.search).get("lang");
  var allowed = langs.split(",").filter(function (l) { return l !== "en"; });
  if (wanted && allowed.indexOf(wanted) !== -1) {
    document.cookie = "googtrans=/en/" + wanted + ";path=/";
  } else {
    // No (or English) lang param: forget a translation remembered from an earlier visit.
    document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: "en", includedLanguages: langs, layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
      "google_translate_element"
    );
  };
  var s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.head.appendChild(s);
})();
