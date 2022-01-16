// les champs qui nous intéressent pour les RegExs
const nom_user = document.getElementById('nom');
const prenom_user = document.getElementById('prenom');
const identifiant_user = document.getElementById('identifiant');

const password1_user = document.getElementById('password1');
const age_user = document.getElementById('age');
const password2_user = document.getElementById('password2');
const submit_button = document.getElementById('submit_button');
const confirm_button = document.getElementById('confirm_button');

const checkbox_CGU = document.getElementById('CGU');

// le bouton est désactivé par défault
submit_button.disabled = true;
submit_button.className = 'invalid';

const inputs = [nom_user, prenom_user, identifiant_user];

// les regex patterns dont on a besoin pour la validation
const patterns = {
    nom: /^[a-z]{1,}$/i, // le nom devrait être composé seulement de lettres
    prenom: /^[a-z]{1,}$/i, // le prénom devrait être composé seulement de lettres aussi
    identifiant: /^[a-z]{1,12}$/i // moins de 12 caractères - lettres
};

// on attache un Listener à chaque champ qui nous intéresse pour tester les RegExs
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.id.value]);
    });
});

checkbox_CGU.addEventListener('change', (e) => {
    verify_checkbox(document.getElementById('CGU'));
});

// vérification du 1er mot de passe
password1_user.addEventListener('keyup', (e) => {
    forceMdp(document.getElementById('password1').value);
});

// Listener pour vérifier le champ "age"
age_user.addEventListener('keyup', (e) => {
    check_age(document.getElementById('age').value);
});

// Listener pour confirmer le champ du mot de passe
password2_user.addEventListener('keyup', (e) => {
    validation_password(document.getElementById('password1').value, document.getElementById('password2').value);
});

confirm_button.addEventListener('click', (e) => {
    confirm_form(document.getElementById('submit_button'));
});

submit_button.addEventListener('click', (e) => {
    show_info_user();
});

// on affiche les infos saisie lors de la soumission du formulaire
function show_info_user()
{
    alert("VOICI VOS INFORMATIONS:\nPrénom: "+prenom_user.value+"\nNom: "+nom_user.value+"\nAge: "+age_user.value+"\nIdentifiant: "+identifiant_user.value+"\nMot de passe: "+password2_user.value);
}

// on confirme les données saisies pour valider
function confirm_form(submit_button)
{
    var liste_inputs = [prenom_user, nom_user, age_user, identifiant_user, password1_user, password2_user, checkbox_CGU];
    var estValide = true;

    for(var i=0; i<liste_inputs.length; i++)
    {
        if(liste_inputs[i].className == 'invalid')
        {
            estValide = false;
            break;
        }
    }

    if(estValide)
    {
        submit_button.className = 'valid';
    }

    submit_button.disabled = (!estValide);
}

// on vérifie que le 2ème mot de passe soit identique au 1er
function validation_password(password1, password2)
{
    if(password1 == password2)
    {
        document.getElementById('password2').className = 'valid';
    }        
    else
    {
        document.getElementById('password2').className = 'invalid';
    }
}

// on vérifie si la checkbox est cochée ou pas
function verify_checkbox(checkbox)
{
    if(checkbox.checked)
    {
        checkbox.className = 'valid';
    }
    else
    {
        checkbox.className = 'invalid';
    }
}

// validation de l'age
function check_age(age)
{
    if(age >= 18)
    {
        document.getElementById('age').className = 'valid';
    }
    else
    {
        document.getElementById('age').className = 'invalid';
    }
}

// validation des champs choisis dans la liste "inputs"
function validate(field, regex)
{
    // on teste chaque champ de la liste avec sa RegEx correspondante
    if(regex.test(field.value))
    {
        field.className = 'valid';
    }
    else 
    {
        field.className = 'invalid';
    }
}

// vérification de la "force" du mot de passe saisi
function forceMdp(mdp) 
{
    document.getElementById('password1').className = 'valid';
    const regs = [/.{8,}/, /[a-z]/, /[A-Z]/, /[0-9]/, /[^0-9a-zA-Z]/];
    var force = 0;
    for(var reg of regs) 
    {
        if(reg.test(mdp))
        {
            force += 20;
        }
    }
    console.log(force);
    document.getElementById("pourcentage").innerHTML = force + " %";
}
