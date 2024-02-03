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
            showMainSection.style.flexDirection = "column";
            return;
        }

        if(content.clickedNav === "discography"){
            content.getDiscographyJson();
            return;
        }
        
        if(content.clickedNav === "links") {
            content.getLinks();
            return;
        }

        showMainSection.style.display = "block";
        content.adminOptions();
        return;
    }
    
    
    showAlbums(albums) {
        // Δημιουργούμε table και εμφανίζουμε τις κατάλληλες πληροφορίες για τις αντίστοιχες επιλογές.
        let anHTML = `<table><tr><th>Album</th><th>Release Date</th><th>Spotify Streams</th><th>Total Sales</th></tr>`;
        for(let anAlbum of albums.discography) {
            // Αν showAlbum = true, τότε το συγκεκριμένο άλμπουμ αντιστοιχεί στην επιλογή που κάνανμε στο πλάγιο μενού. Αλλιώς δεν το εμφανίζουμε.
            let showAlbum = true;
            if(content.clickedAside === "studio-albums" && anAlbum.type !== "studio-album") {
                showAlbum = false;
            } else if(content.clickedAside === "extended-play-albums" && anAlbum.type !== "extended-play-album") {
                showAlbum = false;
            } else if(content.clickedAside === "compilation-albums" && anAlbum.type !== "compilation-ablum") {
                showAlbum = false;
            }

            if(showAlbum === true) {
                anHTML += "<tr><td>" + anAlbum.name + 
                "</td><td>" + anAlbum.release_date + 
                "</td><td>" + anAlbum.spotify_streams + 
                "</td><td>" + anAlbum.total_sales + "</td></tr>";
            }
            
        }
        // Εμφανίζουμε το table με τα κατάλληλα άλμπουμς.
        anHTML += "</table>";
        document.querySelector(".discography-section").innerHTML = anHTML;
    }

    async getDiscographyJson() {
        // Διαβάζουμε το JSON αρχείο με τη δισκογραφία χρησιμοποιώντας το fetch.
        fetch("/discography", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                if(!res.ok) {
                    throw new Error(res.status);
                }
                return res.json()
            })
            .then((json) => content.showAlbums((json)))
            .catch((err) => console.error("Error:", err));
    }

    showLinks(links) {
        // Δημιουργούμε table και εμφανίζουμε τα κατάλληλα λίνκς για τις αντίστοιχες επιλογές του πλάγιου μενού.
        let anHTML = `<table><tr><th>Links</th></tr>`;
        for(let aLink of links) {
            if(content.clickedAside === "official-sites") {
                if(aLink.type === "official-website") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            } else if(content.clickedAside === "stream-music") {
                if(aLink.type === "stream-music") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            } else if(content.clickedAside === "social-media") {
                if(aLink.type === "social-media") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            } else {
                if(aLink.type === "resources") {
                    anHTML += "<tr><td><a href =\"" + aLink.url + "\">" + aLink.name + "</a></td></tr>";
                }
            }
        }
        anHTML += "</table>";
        document.querySelector(".links-section").innerHTML = anHTML;
    }

    async getLinks() {
        // Διαβάζουμε τα λινκς χρησιμοποιώντας το fetch.
        fetch('/links', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                if(!res.ok) {
                    throw new Error(res.status);
                }
                return res.json()
            })
            .then((json) => content.showLinks((json)))
            .catch((err) => console.error("Error:", err));
    }
}


const content = new ShowContent();
const navLi = document.querySelectorAll(".main-nav-li"); // Κρατάμε όλα τα li της μπάρας πλοήγησης στο header.
for(let elementNavLi of navLi) elementNavLi.addEventListener("click", content.showAsideMenu); // Καλούμε τη συνάρτηση showAsideMenu για κάθε στοιχείο που κλικάρουμε.


// Ελέγχουμε αν υπάρχουν cookies για το username όταν φορτώνουμε την ιστοσελίδα.
document.addEventListener('DOMContentLoaded', function() {
    // Συνάρτηση που ελέγχει αν το cookie για το username χρησιμοποιείται.
    function checkCookie(cookieName) {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (value === cookieName) {
          return value; // Αν το cookie υπάρχει, επιστρέφουμε το username του χρήστη.
        }
      }
      return null;
    }
  
    
    // Ελέγχουμε αν το cookie υπάρχει.
    const usernameCookie = checkCookie('user1');
    
    // Αν υπάρχει, κρύβουμε το login και εμφανίζουμε τις επιλογές που μπορεί του πλάγιου μενού που μπορεί να έχει πρόσβασή μόνο ο διαχειριστής.
    if (usernameCookie) {
        document.querySelector(".aside-div-loged-on").style.display = "block";
        document.querySelector(".aside-div-login").style.display = "none";
        return;
    }

    // Αν δεν υπάρχει, εμφανίζουμε μόνο την επιλογή για login.
    document.querySelector(".aside-div-loged-on").style.display = "none";
    document.querySelector(".aside-div-login").style.display = "block";
});
