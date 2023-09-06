const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express");
const router = express.Router();


const newspapers = [
    {
        name: "the guardian",
        address: "https://www.theguardian.com/environment/climate-crisis/all",
    },
    {
        name: "the guardian",
        address: "https://www.theguardian.com/environment/climate-crisis?page=2",
    },
    {
        name: "the guardian",
        address: "https://www.theguardian.com/environment/climate-crisis?page=3",
    },
    {
        name: "the guardian",
        address: "https://www.theguardian.com/environment/climate-crisis?page=4",
    },
    {
        name: "the guardian",
        address: "https://www.theguardian.com/environment/climate-crisis?page=5",
    },

]

const articles = []
let newArticles = []

newspapers.forEach(newspaper =>{
    axios.get(newspaper.address)
    .then((response)=>{
       const page = response.data
       const $ = cheerio.load(page)

       $('a:contains("climate")', page).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                const image_url = $(this).parent().find("img").attr("src")
                const newsObj = {
                    title,
                    url: newspaper.baseUrl ? newspaper.baseUrl  + url : url,
                    source: newspaper.name,
                    image_url: image_url
                }
                
                articles.push(newsObj)
            })

        newArticles = [... articles].filter((article)=>{
            return article.image_url
        })
        })
    })




router.get("/news", (req, res) => {
    res.json(newArticles)
});

module.exports = router;
