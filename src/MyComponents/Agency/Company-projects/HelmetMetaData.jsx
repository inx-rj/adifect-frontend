import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function HelmetMetaData(props) {
    let location = useLocation();

    let bashUrl = window.location.origin;
    let currentUrl = bashUrl + location.pathname;
    let quote = props.quote ? props.quote : "Default quote";
    let title = props.title ? props.title : "Default Title";
    let image = props.image ? props.image : "https://t3.ftcdn.net/jpg/05/52/37/18/360_F_552371867_LkVmqMEChRhMMHDQ2drOS8cwhAWehgVc.jpg";
    let description = props.description ? props.description : "A four-bed, three-bath home available on Deerchase Drive offers 3,815 square feet of living space.";
    let hashtag = props.hashtag ? props.hashtag : "#";

    return (
        <Helmet>
            {/* <title>{title}</title> */}
            <meta property="og:locale" content="en_US" />
            <link rel="canonical" href={bashUrl} />
            <meta name="description" content={description} />

            {/* Facebook */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Social Marketing" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:description" content={description} />
            <meta name="og:image" property="og:image" content={image} />
            <meta name="og:image:secure_url" property="og:image:secure_url" content={image} />
            <meta name="og:image:alt" property="og:image:alt" content="Alt text for image" />
            <meta property="og:hashtag" content={hashtag} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="adifect-frontend.vercel.app" />
            <meta property="twitter:url" content="https://adifect-frontend.vercel.app/" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content="Alt text for image" />

            {/* Extra */}
            {/* <meta http-equiv="X-UA-Compatible" content="IE=edge" /> */}
            {/* <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="CampersTribe" />
            <meta property="og:description" dangerouslySetInnerHTML={description} /> */}
        </Helmet>
    );
}