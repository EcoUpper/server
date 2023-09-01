const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express");
const router = express.Router();


const newspapers = [
    {
        name: "telegraph",
        address: "https://www.telegraph.co.uk/environment/page-2/"
    },
    {
        name: "guardian",
        address: "https://www.theguardian.com/environment/climate-crisis/all"
    }
]

const articles = []

newspapers.forEach(newspaper =>{
    axios.get(newspaper.address)
    .then((response)=>{
       const page = response.data
       const $ = cheerio.load(page)

       $('a:contains("climate")', page).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })

        })
    })
})

router.get("/news", (req, res) => {
    res.json(articles)
});

module.exports = router;
