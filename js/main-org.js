const box = document.getElementById('animeBox'),
genrateBtn = document.querySelector('.genrateBtn'),
showName = document.querySelector('.showName'),
userImg = document.getElementById('userImg'),
userBox = document.getElementById('userBox'),
label = document.querySelector('label[for="userImg"]'),
quoteDes = document.querySelector('.quote-description'),
refreshBtn = document.querySelector('.refresh'),
container = document.querySelector('.container');

let userImgUrl = '';
let useInputBool = false;

userImg.addEventListener("change", function () {
    getImgData();
});

function getImgData() {
    const files = userImg.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        userBox.style.backgroundImage = `url(${this.result})`;
        label.style.display = "none";
        useInputBool = true;
      });    
    }
}

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => 
        {
            genrateBtn.addEventListener('click', function(){
                if(useInputBool){
                    genrateBtn.innerHTML = `Loading...`;
                    setTimeout(()=>{
                        let randomNum = Math.floor(Math.random() * json.length);
                    
                        // Remove ../ this on publish
                        box.style.backgroundImage = "url(images/" + json[randomNum].src+".jpg";
                        showName.style.display = "block";
                        showName.innerHTML = `You look like ${json[randomNum].name}`;
        
                        genrateBtn.style.display = "none";
        
                        refreshBtn.style.display = "block";
                        refreshBtn.addEventListener('click', ()=>{
                            window.location.reload(true);
                        })
                        // console.log(json[randomNum].src)
                    }, 2000);

                    
                }else{
                    userBox.classList.add('red');

                    setTimeout(()=>{userBox.classList.remove('red')}, 300)
                }
            });
        }
    );

fetch('./animequotes.json')
        .then((response) => response.json())
        .then((json) => {
            let randomNum = Math.floor(Math.random() * Object.keys(json.Quote). length);

            quoteDes.innerHTML = `${json.Quote[randomNum]} <br> "${json.Character[randomNum]}"`

            // console.log(json);
        });


// Sharing Buttons
const facebookBtn = document.querySelector(".web-facebook"),
redditBtn = document.querySelector(".web-reddit"),
linkedinBtn = document.querySelector(".web-linkedin"),
twitterBtn = document.querySelector(".web-twitter"),
linkBtn = document.querySelector(".web-link"),
whatsappBtn = document.querySelector('.web-whatsapp');

function webShare(){
    let webShareTitle = document.querySelector(".mainHeading");

    let webUrl = encodeURI(document.location.href);
    let webtitle = encodeURI(webShareTitle.innerHTML);

    facebookBtn.setAttribute(
        "href",
        `https://www.facebook.com/sharer.php?u=${webUrl}`
        );

    redditBtn.setAttribute(
        "href",
        `https://reddit.com/submit?url=${webUrl}&title=${webtitle}`
        );

    linkedinBtn.setAttribute(
        "href",
        `https://www.linkedin.com/shareArticle?url=${webUrl}&title=${webtitle}`
        );        
        
    twitterBtn.setAttribute(
        "href",
        `https://twitter.com/share?url=${webUrl}&text=${webtitle}`
        );
        
    linkBtn.onclick = function() {
        navigator.clipboard.writeText(document.location.href)
    }

    whatsappBtn.onclick = function() {  
        window.open(`whatsapp://send?text= ${webtitle}<br>${webUrl}`);  
    }

}

window.addEventListener('load', ()=>{webShare();});