(function () {
  "use strict";

  var liste = document.getElementById("liste");
  var vide = document.getElementById("vide");
  var compteur = document.getElementById("compteur");
  var recherche = document.getElementById("recherche");
  var filtres = document.getElementById("filtres");

  var categorieActive = "Tout";

  document.getElementById("titre-site").textContent = SITE.titre;
  document.getElementById("sous-titre").textContent = SITE.sousTitre;
  document.getElementById("pied-texte").textContent = SITE.pied;
  document.title = SITE.titre;

  // Documents triés du plus récent au plus ancien
  var docs = DOCUMENTS.slice().sort(function (a, b) {
    return (b.date || "").localeCompare(a.date || "");
  });

  function normaliser(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function formaterDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  function creer(tag, classe, texte) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texte) el.textContent = texte;
    return el;
  }

  function construireFiltres() {
    var categories = ["Tout"];
    docs.forEach(function (d) {
      if (d.categorie && categories.indexOf(d.categorie) === -1) categories.push(d.categorie);
    });
    if (categories.length <= 2) { filtres.hidden = true; return; }

    categories.forEach(function (c) {
      var b = creer("button", "filtre", c);
      b.type = "button";
      b.setAttribute("aria-pressed", c === categorieActive ? "true" : "false");
      b.addEventListener("click", function () {
        categorieActive = c;
        Array.prototype.forEach.call(filtres.children, function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
        afficher();
      });
      filtres.appendChild(b);
    });
  }

  function afficher() {
    var q = normaliser(recherche.value);
    liste.innerHTML = "";
    var n = 0;

    docs.forEach(function (d) {
      if (categorieActive !== "Tout" && d.categorie !== categorieActive) return;
      var texte = normaliser([d.titre, d.description, d.categorie].join(" "));
      if (q && texte.indexOf(q) === -1) return;

      var li = creer("li", "doc");
      li.appendChild(creer("h2", "", d.titre));

      var meta = [d.categorie, formaterDate(d.date)].filter(Boolean).join(" · ");
      if (meta) li.appendChild(creer("p", "meta", meta));
      if (d.description) li.appendChild(creer("p", "desc", d.description));

      var actions = creer("div", "actions");
      var ouvrir = creer("a", "lien", "Ouvrir");
      ouvrir.href = d.fichier;
      ouvrir.target = "_blank";
      ouvrir.rel = "noopener";
      var tel = creer("a", "lien", "Télécharger");
      tel.href = d.fichier;
      tel.setAttribute("download", "");
      actions.appendChild(ouvrir);
      actions.appendChild(tel);
      li.appendChild(actions);

      liste.appendChild(li);
      n++;
    });

    compteur.textContent = n + (n > 1 ? " documents" : " document");
    vide.hidden = n !== 0;
  }

  recherche.addEventListener("input", afficher);
  construireFiltres();
  afficher();
})();
