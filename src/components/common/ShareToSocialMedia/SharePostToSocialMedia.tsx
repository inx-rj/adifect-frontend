import React from 'react';
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CommentIcon from '@mui/icons-material/Comment';

const SharePostToSocialMedia = (props) => {
    const { url, title, facebook = false, sms = false, linkedIn = false, twitter = false, email = false, call = false, color = "inherit", sx = {} } = props;

    const handleTwitterClick = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'width=600,height=300');
    };

    const handleFacebookClick = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=300');
    };

    return (
        <>
            {facebook && <FacebookIcon color={color} sx={sx} />}
            {linkedIn && <LinkedInIcon color={color} sx={sx} />}
            {twitter && <TwitterIcon color={color} sx={sx} />}
            {email && <EmailIcon color={color} sx={sx} />}
            {call && <CallIcon color={color} sx={sx} />}
            {sms && <CommentIcon color={color} sx={sx} />}
        </>
    )
}

export default SharePostToSocialMedia
