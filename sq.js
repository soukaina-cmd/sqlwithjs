var db = openDatabase('ourdb', '1.0', 'database for managing tables of our app', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE personne (cin, nom, prenom, age)');
});



document.querySelector("#button").addEventListener("click", afficherpopup)
document.querySelector(".pop").addEventListener("click", cacherpopup)
document.querySelector(".close").addEventListener("click", cacherpopup)
document.querySelector(".annuler").addEventListener("click", cacherpopup)
// ajouter
document.querySelector("#ajouter").addEventListener("click", ajouterper)
function ajouterper() {
  var objt = { "cin": document.querySelector("#inpt_cin").value, "nom": document.querySelector("#inpt_nom").value, "prenom": document.querySelector("#inpt_prenom").value, "age": document.querySelector("#inpt_age").value }
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO personne (cin, nom, prenom, age) VALUES(?,?,?,?)', [objt.cin, objt.nom, objt.prenom, objt.age]);
  });
  //   quand on clique sur ajouter elle dIsparu
  cacherpopup()
  window.location.href = ""

}
afficher_table()
// recuperation des donne de la basse de donne locale au html
function afficher_table() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM personne', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {

        document.querySelector("#tbd").innerHTML += "<tr><td>" + results.rows.item(i).cin + "</td><td>" + results.rows.item(i).nom + "</td><td>" + results.rows.item(i).prenom + "</td><td>" + results.rows.item(i).age + "</td><td><i style='color:red;cursor:pointer;'onclick='supprimer(this)' class='fas fa-trash-alt'></i></td></tr>"
      }
    });
  });
}
// delete
function supprimer(x) {
  if (confirm("vous voulez suprimer cet element")) {
    var el = x.parentElement.parentElement.children[0].textContent
    db.transaction(function (tx) {
      tx.executeSql("DELETE FROM personne where cin='" + el + "'")
    });
     window.location.href = ""
  }
}





function afficherpopup() {
  document.querySelector(".pop").style.display = "block"
  document.querySelector(".up").style.display = "block"
}
function cacherpopup() {
  document.querySelector(".pop").style.display = "none"
  document.querySelector(".up").style.display = "none"
}
