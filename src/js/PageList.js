const searchInput = document.getElementById('search');

const PageList = (argument = '') => {
    argument = document.querySelector("input").value;
    console.log('Page List', argument);

    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');
        let articles = "";

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = url + `?key=` + process.env.API_KEY + "&search=" + cleanedArgument;

            } else {
                finalURL = url + `?key=` + process.env.API_KEY + "&dates=2022-01-01,2023-01-01&ordering=-rating";
            }
            // const finalURL = argument ? `${url}&search=${argument}` : url;
            fetch(finalURL)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData.results);
                    articles += `<button class="plat">Platform : any </button>
          <div class="card-group">
          `
                    responseData.results.forEach((article) => {


                        articles += `
                  <div class="cardGame">
                    <img  class="card-img-top"  style="height:100%" src="${article.background_image}">
                    <div class="card-body">
                    <a href="#pagedetail/${article.id}" class="card-title">${article.name}</a>
                    `
                        if (article.platforms) {
                            articles += `<p class="card-text" >`
                            article.platforms.forEach(e => {
                                articles += `${e.platform.slug} `
                            })
                            articles += "</p>"
                        }

                        articles += `
                    
                  </div>
                  </div>
                  
                `;
                    });
                    articles += ` </div>
          <div class="d-flex justify-content-center">
          <button class=" more">Show more</button>
        </div>`
                    document.querySelector(".page-list .articles").innerHTML = articles;
                });
        };

        fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=27`, cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
        <h1 class="instyle">Welcome,</h1>
        <p class="instyle">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
        <section class="page-list">
          <div class="articles">Hey, this page is a PageList template, about : ${argument}</div>
        </section>
        `;

        preparePage();
    };

    render();
    searchInput.addEventListener('input', (e) => {
        argument = e.target.value;
        if (argument !== '' && argument !== undefined) {
            preparePage();
        }
        if (argument == '') {
            PageList();
        };
        // console.log(e.target.value);
    });

};
export { PageList };