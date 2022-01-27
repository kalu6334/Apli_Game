function PageDetail(argument = '') {
    console.log('Page Detail', argument);
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, "-");

        const displayGame = (gameData) => {
            // const { name, released, description, background_image, tags } = gameData;
            const articleDOM = document.querySelector(".page-detail .article");
            articleDOM.querySelector("h1.title").innerHTML = gameData.name;
            articleDOM.querySelector("div.background").innerHTML = `<img class="card-img-top" style="height:30em" src="${gameData.background_image}">`;
            articleDOM.querySelector("p.description").innerHTML = gameData.description;
            articleDOM.querySelector("p.release-date span").innerHTML = gameData.released;
            articleDOM.querySelector("p.developper").innerHTML = `Developper : ${gameData.developers.map((dev) => dev.name)}`;
            articleDOM.querySelector("div.tag").innerHTML = `Tags : ${gameData.tags.map((tag) => tag.name)}`;
            articleDOM.querySelector("div.genre").innerHTML = `Genres : ${gameData.genres.map((genre) => genre.name)}`;
            articleDOM.querySelector("p.editor").innerHTML = `Editor : ${gameData.publishers.map((edite) => edite.name)}`;
            articleDOM.querySelector("div.plateform").innerHTML = `Plateforms : ${gameData.platforms.map((platf) => platf.platform.name)}`;
            articleDOM.querySelector("p.site").innerHTML = "Website du jeu : " + `<a href='${gameData.website}'> cliquer ici </a>`;
            // // video de presentation
            articleDOM.querySelector("p.average").innerHTML = `Moyenne des notes : ${gameData.rating}/5  pour : ${gameData.ratings_count} votes`;
            // articleDOM.querySelector("div.screenshots").innerHTML = `<img src="${gameData.short_screenshots.map((scren) => scren.image)}">`;
            // Le/Les lien(s) pour acheter le jeu (lien(s) externe(s))
        };


        const fetchGame = (url, argument) => {
            fetch(`${url}/${argument}?key=` + process.env.API_KEY)
                .then((response) => response.json())
                .then((responseData) => {
                    displayGame(responseData);
                    console.log(responseData);
                });
        };

        fetchGame('https://api.rawg.io/api/games', cleanedArgument);
        //-----------------------------------------------------------------------------


    };



    function render() {
        pageContent.innerHTML = `
          <section class="page-detail">
          <div class="article">
          <div class="card thepic">
           <div class="background"></div>
          </div>
           <div class="card-body">
              <h1 class="title">  </h1>  
              <p class="average"></p>
              <p class="description"></p>  
              <p class="release-date">Release date : <span></span></p>  
              <p class="developper"></p>              
              <p class="editor"></p>
              <div class="plateform"></div>
              <p class="site"></p>              
              <div class="genre"></div>
              <div class="tag"></div>  
              <div id="screenshots"></div>
            </div> 
          </div>
          </section>
        `;

        preparePage();
    }

    render();

};
export { PageDetail };