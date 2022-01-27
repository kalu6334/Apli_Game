const PageList = (argument = '') => {
    console.log('Page List', argument);
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');

        const displayResults = (articles) => {
            const resultsContent = articles.map((article) => (
                `<article class="cardGame">
                    <img  class="card-img-top"  style="height:100%" src="${article.background_image}">
                    <a href="#pagedetail/${article.id}" class="card-title">${article.name}</a>       
            </article>`
            ));
            const resultsContainer = document.querySelector('.page-list .articles');
            resultsContainer.innerHTML = resultsContent.join("\n");
        };

        const fetchList = (url, argument) => {
            const finalURL = argument ? `${url}&search=${argument}` : url;
            fetch(finalURL)
                .then((response) => response.json())
                .then((responseData) => {
                    displayResults(responseData.results)
                    console.log(responseData.results);
                });
        };

        fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=27`, cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
          <section class="page-list">
          <div class="articles">Hey, this page is a PageList template, about : ${argument}</div>
          </section>
        `;

        preparePage();
    };

    render();

};
export { PageList };