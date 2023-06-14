// const REACT_APP_FB_APP_ID="244045127997497" // Inx-Microsoft (OneEyed Jack)
// const REACT_APP_FB_APP_ID="926907658370963" // Inx-Gmail (Inx)
const REACT_APP_FB_APP_ID = "985432012649664" // Mailinator (John Due)

window.fbAsyncInit = function () {
    window.FB.init({
        appId: REACT_APP_FB_APP_ID,
        cookie: true,
        status: true,
        xfbml: true,
        autoLogAppEvents: true,
        version: "v16.0",
    });

    // Now you can access the FB object
    // console.log(FB);
};

// Load the SDK asynchronously
(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");