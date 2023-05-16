const express = require('express');
const path = require('path');
const fs = require("fs");
const { getPostById } = require('./stub/posts');
const app = express();

const PORT = process.env.PORT || 3001;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

// console.log({ __dirname, path, indexPath }, '__dirname');

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));
// here we serve the index.html page
app.get('/*', async (req, res, next) => {

    const urlId = Number(req.originalUrl.split('/').pop());

    console.log({ urlId }, 'URL');

    try {
        if (!isNaN(urlId)) {

            const response = await fetch(`https://dev-api.adifect.com/community/stories/${urlId}`); // Replace with your API endpoint URL
            const { data } = await response.json();

            if (Object.keys(data).length) {
                // res.send(data); // Send the response back to the client
                fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                    console.log({ reqQuery: req.originalUrl.split('/').pop(), reqBody: req.body });

                    if (err) {
                        console.error('Error during file reading', err);
                        return res.status(404).end();
                    }

                    if (!data) return res.status(404).send("Post not found");

                    // inject meta tags
                    htmlData = htmlData.replace(
                        "<title>Adifect Frontend title</title>",
                        `<title>${data?.community?.name}</title>`
                    )
                        .replace('__META_OG_TITLE__', data.title)
                        .replace('__META_DESCRIPTION__', data.lede)
                        .replace('__META_OG_DESCRIPTION__', data.lede)
                        .replace('__META_OG_IMAGE__', data.image?.[0])


                    // console.log({ req, res, err, htmlData, postId, post, htmlData })
                    return res.send(htmlData);
                });
            } else {
                res.status(404).send('No Data');
            }
        } else {
            fs.readFile(indexPath, 'utf8', (err, htmlData) => {

                htmlData = htmlData.replace(
                    "<title>React App</title>",
                    `<title>Adifect App</title>`
                )
                    .replace('__META_OG_TITLE__', 'A')
                    .replace('__META_OG_DESCRIPTION__', 'B')
                    .replace('__META_DESCRIPTION__', 'C')
                // .replace('__META_OG_IMAGE__', post.thumbnail)


                // console.log({ req, res, err, htmlData, postId, post, htmlData })
                return res.send(htmlData);
            });
        }

    } catch (error) {
        console.error('Error:', error);
        // res.status(500).send('Something went wrong');
    }
});
// // listening...
// app.listen(PORT, (error) => {
//     if (error) {
//         return console.log('Error during app startup', error);
//     }
//     console.log("listening on " + PORT + "...");
// });
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

module.exports = app;