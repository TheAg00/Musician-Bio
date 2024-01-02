class ShowContent {

    // Για κάθε στοιχείο του Nav, εμφανίζουμε τις κατάλληλες επιλογές στο Aside.
    showAsideMenu() {
        // Κρατάμε το όνομα id του στοιχείου που κλικάραμε και φτιάχνουμε το id του αντίστοιχου στοιχείου στο aside.
        content.clickedNav = this.id;

        let submenuId = "#aside-" + content.clickedNav + "-ul";
        let showSubmenu = document.querySelector(submenuId);
    
        // Θέτουμε όλα τα στοιχεία του aside σε display = "none", ώστε να μην εμφανιστούν πολλά div μαζί.
        const asideUl = document.querySelectorAll(".aside-ul");
        for(let elementAsideUl of asideUl) elementAsideUl.style.display = "none";
        
        showSubmenu.style.display = "grid"; // Εμφανίζουμε το div που κλικάραμε.

        // Καλούμε τη showMain για κάθε στοιχείου του aside που κλικάρουμε.
        const asideLi = document.querySelectorAll(".aside-li");
        for(let elementAsideLi of asideLi) elementAsideLi.addEventListener("click", content.showMain);
    }

    // Για κάθε στοιχείο του Aside, εμφανίζουμε και το κατάλληλο περιεχόμενο της main.
    showMain() {
        // Φτιάχνουμε το id του main που θα χρησιμοποιείσουμε.
        content.clickedAside = this.id;
        
        let mainSectionId = "#" + content.clickedAside + "-section";
        let showMainSection = document.querySelector(mainSectionId);

        // Θέτουμε όλα τα στοιχεία του aside σε display = "none", ώστε να μην εμφανιστούν πολλά div μαζί.
        const mainSection = document.querySelectorAll(".content-section");
        for(let elementMainSection of mainSection) elementMainSection.style.display = "none";
        
        // Εμφανίζουμε το div της main.
        document.querySelector(".main-section").style.display = "block";

        // Εμφανίζουμε το div που περιέχει το περιεχόμενο της main που θα εμφανίσουμε.
        let anId = "#" + content.clickedNav + "-section-div";
        document.querySelector(anId).style.display = "block";

        // Για τη βιογραφία και τις φωτογραφίες, απλώς εμφανίζουμε το περιεχόμενό τους.
        if(content.clickedNav === "bio" || content.clickedNav === "photos"){ 
            showMainSection.style.display = "flex";
            return;
        }

        if(content.clickedNav === "works"){
            content.getWorksJson();
            return;
        }
        
        if(content.clickedNav === "links") {
            content.getLinksJson();
            return;
        }

        showMainSection.style.display = "block";
    }

    async getWorksJson() {
        try {
            // Παίρνουμε τα στοιχεία που βρίσκονται στο works.json και τα αποθηκεύουμε στο jsonContent.
            const response = await fetch("./works.json", {method: "GET"});
            const jsonContent = await response.json();

            content.booksArr = JSON.parse(JSON.stringify(jsonContent.books)); // Αντιγράφουμε τον πίνακα books σε νέο πίνακα.

            // Ανάλογα με την επιλογή του χρήστη, εφαρμόζουμε την ανάλογη ταξινόμιση.
            if(content.clickedAside === "by-name") {
                // Ταξινομούμε ως προς το όνομα του βιβλίου.
                content.booksArr.sort((a, b) => {
                    // Μετατρέπουμε τα ονόματα σε πεζά ώστε να γίνει πιό εύστοχη σύγκριση.
                    let elementA = a.name.toLowerCase();
                    let elementB = b.name.toLowerCase();

                    // Μόνο όταν το επιστρέφεται 1 γίνεται αντικατάσταση.
                    if(elementA < elementB) return -1;
                    if(elementA > elementB) return 1;
                    return 0;
                });
            } else if(content.clickedAside === "by-genre"){
                // Ταξινομούμε ως προς το είδος του βιβλίου.
                content.booksArr.sort((a, b) => {
                    // Μετατρέπουμε τα ονόματα σε πεζά ώστε να γίνει πιό εύστοχη σύγκριση.
                    let elementA = a.genre.toLowerCase();
                    let elementB = b.genre.toLowerCase();

                    // Μόνο όταν το επιστρέφεται 1 γίνεται αντικατάσταση.
                    if(elementA < elementB) return -1;
                    if(elementA > elementB) return 1;
                    return 0;
                });
            } else if(content.clickedAside === "by-release-date") {
                // Ταξινομούμε ως προς την ημερομηνία κυκλοφορίας του βιβλίου.
                content.booksArr.sort((a, b) => { 
                    let elementA = a.release_date;
                    let elementB = b.release_date;

                    // Μόνο όταν επιστρέφεται 1 γίνεται αντικατάσταση.
                    if(elementA < elementB) return -1;
                    if(elementA > elementB) return 1;
                    return 0;
                });
            } else if(content.clickedAside === "publisher") {
                // Ταξινομούμε ως προς τον εκδότη του βιβλίου.
                content.booksArr.sort((a, b) => {
                    // Μετατρέπουμε τα ονόματα σε πεζά ώστε να γίνει πιό εύστοχη σύγκριση.
                    let elementA = a.publisher.toLowerCase();
                    let elementB = b.publisher.toLowerCase();

                    // Μόνο όταν επιστρέφεται 1 γίνεται αντικατάσταση.
                    if(elementA < elementB) return -1;
                    if(elementA > elementB) return 1;
                    return 0;
                });
            } else {
                // Ταξινομούμε ως προς αν έχει γυριστεί ταινία βασισμένη στο βιβλίο.
                content.booksArr.sort((a, b) => {
                    // Μετατρέπουμε τα ονόματα σε πεζά ώστε να γίνει πιό εύστοχη σύγκριση.
                    let elementA = a.adaptation.toLowerCase();
                    let elementB = b.adaptation.toLowerCase();

                    // Μόνο όταν το επιστρέφεται 1 γίνεται αντικατάσταση.
                    if(elementA < elementB) return 1;
                    if(elementA > elementB) return -1;
                    return 0;
                });
            }
            content.createWorksTable();
        } catch(err) {
            console.error("Error:", err);
        }
    }

    async getLinksJson() {
        // Παίρνουμε τα στοιχεία που βρίσκονται στο works.json και τα αποθηκεύουμε στο jsonContent.
        const response = await fetch("./links.json", {method: "GET"});
        const jsonContent = await response.json();

        content.linksArr = JSON.parse(JSON.stringify(jsonContent.links)); // Αντιγράφουμε τον πίνακα books σε νέο πίνακα.

        content.createLinksTable();
    }

    createWorksTable() {
        let anHTML = `<table><tr><th>Book</th><th>Genre</th><th>Release Date</th><th>Adaptation</th></tr>`;
        for(let aBook of content.booksArr){
            anHTML += "<tr><td>" + aBook.name + 
            "</td><td>" + aBook.genre + 
            "</td><td>" + aBook.release_date + 
            "</td><td>" + aBook.adaptation + "</td></tr>";
        }
        anHTML += "</table>";
        document.querySelector(".works-section").innerHTML = anHTML;
    }

    createLinksTable() {
        let anHTML = `<table><tr><th>Links</th></tr>`;
        for(let aLink of content.linksArr) {
            if(content.clickedAside === "official-sites") {
                if(aLink.category === "official-sites") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            } else if(content.clickedAside === "buy-the-books") {
                if(aLink.category === "buy-the-books") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            } else {
                if(aLink.category === "resourses") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            }  
        }
        anHTML += "</table>";
        document.querySelector(".links-section").innerHTML = anHTML;
    }
}

const socket = new WebSocket("ws://localhost:4000");


const content = new ShowContent();
const navLi = document.querySelectorAll(".main-nav-li"); // Κρατάμε όλα τα li της μπάρας πλοήγησης στο header.
for(let elementNavLi of navLi) elementNavLi.addEventListener("click", content.showAsideMenu); // Καλούμε τη συνάρτηση showAsideMenu για κάθε στοιχείο που κλικάρουμε.