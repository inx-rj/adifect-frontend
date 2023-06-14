import {
  AGENCY_COMPANY_PROJECT_LIST_REQUEST,
  AGENCY_COMPANY_PROJECT_LIST_SUCCESS,
  AGENCY_COMPANY_PROJECT_LIST_FAIL,
  AGENCY_COMPANY_PROJECT_LIST,
  AGENCY_COMPANY_PROJECT_FILTERS_LIST_REQUEST,
  AGENCY_COMPANY_PROJECT_FILTERS_LIST_SUCCESS,
  AGENCY_COMPANY_PROJECT_FILTERS_LIST_FAIL,
  AGENCY_COMPANY_TAGS_LIST_REQUEST,
  AGENCY_COMPANY_TAGS_LIST_SUCCESS,
  AGENCY_COMPANY_TAGS_LIST_FAIL,
  AGENCY_COMPANY_TAGS_LIST,
  AGENCY_COMPANY_ADD_TAG_REQUEST,
  AGENCY_COMPANY_ADD_TAG_SUCCESS,
  AGENCY_COMPANY_ADD_TAG_FAIL,
  AGENCY_COMMUNITY_SETTINGS_LIST_REQUEST,
  AGENCY_COMMUNITY_SETTINGS_LIST_SUCCESS,
  AGENCY_COMMUNITY_SETTINGS_LIST_FAIL,
  AGENCY_AUDIENCES_LIST_REQUEST,
  AGENCY_AUDIENCES_LIST_SUCCESS,
  AGENCY_AUDIENCES_LIST_FAIL,
  AGENCY_COMPANY_STORY_DETAILS_FAIL,
  AGENCY_COMPANY_STORY_DETAILS_SUCCESS,
} from "../../constants/Agency-companies-constants";

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

// Agency company projects list***********
export const agencyCompanyProjectsListAction =
  ({ rowsPerPage, page }, filters) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: AGENCY_COMPANY_PROJECT_LIST_REQUEST,
        });

        const {
          authReducer: { userData },
        } = getState();

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          params: { ...filters, page_size: rowsPerPage, page },
        };

        const { data } = await api.get(
          `${BACKEND_API_URL}community/stories/`,
          config
        );

        // const { data } = await api.get(`https://c4fc-122-170-103-140.ngrok.io/community/stories/`, config);
        // const data = {
        //   data: {
        //     count: 7021,
        //     next: "http://dev-api.adifect.com/community/stories/?page=2",
        //     previous: null,
        //     results: [
        //       {
        //         id: 412587,
        //         community: {
        //           id: 5397,
        //           created: "2023-04-18T11:34:27.662748Z",
        //           modified: "2023-04-18T11:34:27.662775Z",
        //           is_trashed: false,
        //           community_id: 130,
        //           name: "Newport News",
        //           client_company_id: 228,
        //           state: null,
        //           is_active: true,
        //           community_metadata: {
        //             id: 130,
        //             name: "Newport News",
        //             slug: "newport-news-va",
        //             site_url: null,
        //             market_id: 7,
        //             site_name: "",
        //             site_ga_id: null,
        //             updated_at: "2021-12-02T15:47:15.000Z",
        //             site_ga_enabled: true,
        //             client_company_id: 228,
        //           },
        //         },
        //         tag: [],
        //         created: "2023-04-18T11:36:53.655846Z",
        //         modified: "2023-04-18T11:36:53.655871Z",
        //         is_trashed: false,
        //         story_id: 510103149,
        //         title:
        //           "Kecoughtan grad Fortune contributes to Providence victory",
        //         lede: "Kecoughtan High School graduate Josh Fortune scored two points in Providence College's 76-66 home win over conference rival Seton Hall on March 5 at Dunkin' Donuts Center in Providence, R.I., the Providence College website reported.",
        //         image: null,
        //         word_count: 0,
        //         publication_date: "2013-03-06",
        //         status: "Published",
        //         body: '<p>&#13;\n&#9;Kecoughtan High School graduate Josh Fortune scored two points in Providence College&#39;s 76-66 home win over conference rival Seton Hall on March 5 at Dunkin&#39; Donuts Center in Providence, R.I., the Providence College website reported.</p>&#13;\n<p>&#13;\n&#9;Fortune also recorded one steal for the Friars, who improved to 17-12 on the season and 9-8 in the Big East Conference.</p>&#13;\n<p>&#13;\n&#9;Providence&#39;s next game is noon Saturday, March 9 at Connecticut.</p>&#13;\n<p>&#13;\n&#9;Fortune is a freshman guard for Providence College. The Hampton native is a 2012 graduate of Kecoughtan High School, where he served as a team captain in 2011 and 2012. He is the son of Craig and Angela Fortune.</p>&#13;\n<p>&#13;\n&#9;For more information, visit <a href="http://www.friars.com/sports/m-baskbl/sched/prov-m-baskbl-sched.html" target="_new">www.friars.com</a>.</p>&#13;\n',
        //         p_url: "I7cti0Ed",
        //         is_active: true,
        //         story_metadata: {
        //           id: 510103149,
        //           body: '<p>&#13;\n&#9;Kecoughtan High School graduate Josh Fortune scored two points in Providence College&#39;s 76-66 home win over conference rival Seton Hall on March 5 at Dunkin&#39; Donuts Center in Providence, R.I., the Providence College website reported.</p>&#13;\n<p>&#13;\n&#9;Fortune also recorded one steal for the Friars, who improved to 17-12 on the season and 9-8 in the Big East Conference.</p>&#13;\n<p>&#13;\n&#9;Providence&#39;s next game is noon Saturday, March 9 at Connecticut.</p>&#13;\n<p>&#13;\n&#9;Fortune is a freshman guard for Providence College. The Hampton native is a 2012 graduate of Kecoughtan High School, where he served as a team captain in 2011 and 2012. He is the son of Craig and Angela Fortune.</p>&#13;\n<p>&#13;\n&#9;For more information, visit <a href="http://www.friars.com/sports/m-baskbl/sched/prov-m-baskbl-sched.html" target="_new">www.friars.com</a>.</p>&#13;\n',
        //           paid: false,
        //           author: "LocalLabs News Service",
        //           images: [],
        //           teaser:
        //             "Kecoughtan High School graduate Josh Fortune scored two points in Providence College's 76-66 home win over conference rival Seton Hall on March 5 at Dunkin' Donuts Center in Providence, R.I., the Providence College website reported.",
        //           deleted: false,
        //           type_id: 3,
        //           headline:
        //             "Kecoughtan grad Fortune contributes to Providence victory",
        //           author_id: 1,
        //           published: true,
        //           scheduled: false,
        //           partner_id: null,
        //           story_tags: [],
        //           updated_at: "2016-06-01T03:31:47.000Z",
        //           blacklisted: false,
        //           cms_story_id: 481079,
        //           community_id: 130,
        //           published_at: "2013-03-06T14:17:00Z",
        //           form_datum_id: null,
        //           story_sections: [],
        //           attached_images: [],
        //           story_categories: [],
        //         },
        //         category: [],
        //         analytic: [],
        //       },
        //       {
        //         id: 412588,
        //         community: {
        //           id: 5397,
        //           created: "2023-04-18T11:34:27.662748Z",
        //           modified: "2023-04-18T11:34:27.662775Z",
        //           is_trashed: false,
        //           community_id: 130,
        //           name: "Newport News",
        //           client_company_id: 228,
        //           state: null,
        //           is_active: true,
        //           community_metadata: {
        //             id: 130,
        //             name: "Newport News",
        //             slug: "newport-news-va",
        //             site_url: null,
        //             market_id: 7,
        //             site_name: "",
        //             site_ga_id: null,
        //             updated_at: "2021-12-02T15:47:15.000Z",
        //             site_ga_enabled: true,
        //             client_company_id: 228,
        //           },
        //         },
        //         tag: [],
        //         created: "2023-04-18T11:36:53.656249Z",
        //         modified: "2023-04-18T11:36:53.656259Z",
        //         is_trashed: false,
        //         story_id: 510103150,
        //         title:
        //           "Gloucester High School grad Fischgrund pitches in Randolph-Macon College win",
        //         lede: "Gloucester High School graduate Matt Fischgrund played in Randolph-Macon College's 5-2 win over Methodist University on March 5 at Hugh Stephens Field, the team's website reported.",
        //         image: null,
        //         word_count: 0,
        //         publication_date: "2013-03-06",
        //         status: "Published",
        //         body: '<p>&#13;\n&#9;Gloucester High School graduate Matt Fischgrund played in Randolph-Macon College&#39;s 5-2 win over Methodist University on March 5 at Hugh Stephens Field, the team&#39;s website reported.</p>&#13;\n<p>&#13;\n&#9;The junior pitcher allowed just one run on five hits in his seven-inning sting in the 5-2 victory. He struck out one batter.</p>&#13;\n<p>&#13;\n&#9;Randolph-Macon College is now 4-6 on the season. The team&#39;s next game is at noon Saturday, March 9 at home.</p>&#13;\n<p>&#13;\n&#9;Fischgrund is a 2010 graduate of Gloucester High School.</p>&#13;\n<p>&#13;\n&#9;For more information, visit <a href="http://www.rmcathletics.com/sports/bsb/2012-13/releases/20130305pbqnzr" target="_new">www.rmcathletics.com</a>.</p>&#13;\n',
        //         p_url: "w0h0keYE",
        //         is_active: true,
        //         story_metadata: {
        //           id: 510103150,
        //           body: '<p>&#13;\n&#9;Gloucester High School graduate Matt Fischgrund played in Randolph-Macon College&#39;s 5-2 win over Methodist University on March 5 at Hugh Stephens Field, the team&#39;s website reported.</p>&#13;\n<p>&#13;\n&#9;The junior pitcher allowed just one run on five hits in his seven-inning sting in the 5-2 victory. He struck out one batter.</p>&#13;\n<p>&#13;\n&#9;Randolph-Macon College is now 4-6 on the season. The team&#39;s next game is at noon Saturday, March 9 at home.</p>&#13;\n<p>&#13;\n&#9;Fischgrund is a 2010 graduate of Gloucester High School.</p>&#13;\n<p>&#13;\n&#9;For more information, visit <a href="http://www.rmcathletics.com/sports/bsb/2012-13/releases/20130305pbqnzr" target="_new">www.rmcathletics.com</a>.</p>&#13;\n',
        //           paid: false,
        //           author: "LocalLabs News Service",
        //           images: [],
        //           teaser:
        //             "Gloucester High School graduate Matt Fischgrund played in Randolph-Macon College's 5-2 win over Methodist University on March 5 at Hugh Stephens Field, the team's website reported.",
        //           deleted: false,
        //           type_id: 3,
        //           headline:
        //             "Gloucester High School grad Fischgrund pitches in Randolph-Macon College win",
        //           author_id: 1,
        //           published: true,
        //           scheduled: false,
        //           partner_id: null,
        //           story_tags: [],
        //           updated_at: "2016-06-01T03:33:46.000Z",
        //           blacklisted: false,
        //           cms_story_id: 481088,
        //           community_id: 130,
        //           published_at: "2013-03-06T14:11:00Z",
        //           form_datum_id: null,
        //           story_sections: [],
        //           attached_images: [],
        //           story_categories: [],
        //         },
        //         category: [],
        //         analytic: [],
        //       },
        //       {
        //         id: 412589,
        //         community: {
        //           id: 5397,
        //           created: "2023-04-18T11:34:27.662748Z",
        //           modified: "2023-04-18T11:34:27.662775Z",
        //           is_trashed: false,
        //           community_id: 130,
        //           name: "Newport News",
        //           client_company_id: 228,
        //           state: null,
        //           is_active: true,
        //           community_metadata: {
        //             id: 130,
        //             name: "Newport News",
        //             slug: "newport-news-va",
        //             site_url: null,
        //             market_id: 7,
        //             site_name: "",
        //             site_ga_id: null,
        //             updated_at: "2021-12-02T15:47:15.000Z",
        //             site_ga_enabled: true,
        //             client_company_id: 228,
        //           },
        //         },
        //         tag: [],
        //         created: "2023-04-18T11:36:53.656319Z",
        //         modified: "2023-04-18T11:36:53.656325Z",
        //         is_trashed: false,
        //         story_id: 510103320,
        //         title: "Paper bead making to be held at Point Branch Library",
        //         lede: "Paper bead making will be held at the Point Branch Library at 6 p.m. Thursday, March 14.",
        //         image: null,
        //         word_count: 0,
        //         publication_date: "2013-03-06",
        //         status: "Published",
        //         body: '<p>\n&#9;Paper bead making will be held at the Point Branch Library at 6 p.m. Thursday, March 14.</p>\nAccording to a press release, &quot;Roll your way into spring with paper bead making at the library. Participants will create one project as well as gain the knowledge to create many more designs. All materials are provided free.&quot;<br />\n<br />\nPoint Branch Library is at 2354 York Crossing Drive, Hayes.<br />\n<p>\n&#9;Registration is not required.</p>\n<p>\n&#9;For more information, call 804-693-2998 or visit <a href="http://www.co.gloucester.va.us/Library/tabid/494/Default.aspx">www.co.gloucester.va.us</a>.</p>\n',
        //         p_url: "19fFRW74",
        //         is_active: true,
        //         story_metadata: {
        //           id: 510103320,
        //           body: '<p>\n&#9;Paper bead making will be held at the Point Branch Library at 6 p.m. Thursday, March 14.</p>\nAccording to a press release, &quot;Roll your way into spring with paper bead making at the library. Participants will create one project as well as gain the knowledge to create many more designs. All materials are provided free.&quot;<br />\n<br />\nPoint Branch Library is at 2354 York Crossing Drive, Hayes.<br />\n<p>\n&#9;Registration is not required.</p>\n<p>\n&#9;For more information, call 804-693-2998 or visit <a href="http://www.co.gloucester.va.us/Library/tabid/494/Default.aspx">www.co.gloucester.va.us</a>.</p>\n',
        //           paid: false,
        //           author: "LocalLabs News Service",
        //           images: [],
        //           teaser:
        //             "Paper bead making will be held at the Point Branch Library at 6 p.m. Thursday, March 14.",
        //           deleted: false,
        //           type_id: 18,
        //           headline:
        //             "Paper bead making to be held at Point Branch Library",
        //           author_id: 1,
        //           published: true,
        //           scheduled: false,
        //           partner_id: null,
        //           story_tags: [],
        //           updated_at: "2016-06-01T03:33:46.000Z",
        //           blacklisted: false,
        //           cms_story_id: 481573,
        //           community_id: 130,
        //           published_at: "2013-03-06T18:30:00Z",
        //           form_datum_id: null,
        //           story_sections: [],
        //           attached_images: [],
        //           story_categories: [],
        //         },
        //         category: [],
        //         analytic: [],
        //       },
        //       {
        //         id: 412590,
        //         community: {
        //           id: 5397,
        //           created: "2023-04-18T11:34:27.662748Z",
        //           modified: "2023-04-18T11:34:27.662775Z",
        //           is_trashed: false,
        //           community_id: 130,
        //           name: "Newport News",
        //           client_company_id: 228,
        //           state: null,
        //           is_active: true,
        //           community_metadata: {
        //             id: 130,
        //             name: "Newport News",
        //             slug: "newport-news-va",
        //             site_url: null,
        //             market_id: 7,
        //             site_name: "",
        //             site_ga_id: null,
        //             updated_at: "2021-12-02T15:47:15.000Z",
        //             site_ga_enabled: true,
        //             client_company_id: 228,
        //           },
        //         },
        //         tag: [],
        //         created: "2023-04-18T11:36:53.656373Z",
        //         modified: "2023-04-18T11:36:53.656379Z",
        //         is_trashed: false,
        //         story_id: 510103363,
        //         title:
        //           "5 Newport News runners complete Disney's Princess Half Marathon",
        //         lede: "Five athletes from Newport News completed the Disney's Princess Half Marathon (Women's Division) on Feb. 24 in Lake Buena Vista, Fla.",
        //         image: null,
        //         word_count: 0,
        //         publication_date: "2013-03-06",
        //         status: "Published",
        //         body: '<p>\n&#9;Five athletes from Newport News completed the Disney&#39;s Princess Half Marathon (Women&#39;s Division) on Feb. 24 in Lake Buena Vista, Fla.</p>\n<p>\n&#9;The runners from Newport News and their finishing times were <span data-scayt_word="Mehgan" data-scaytid="1">Mehgan</span> Flores, 28, 2:26:45; <span data-scayt_word="Charlettia" data-scaytid="2">Charlettia</span> Burch, 40, 2:40:08; Tracey Robbins, 44, 3:36:55; <span data-scayt_word="Calesha" data-scaytid="3">Calesha</span> Hayes, 24, 3:50:01; and Margaret <span data-scayt_word="Vincelette" data-scaytid="4">Vincelette</span>, 39, 4:04:02.</p>\n<p>\n&#9;Race organizers said 21,241 runners finished the 13.1-mile race, which began and ended at Disney&#39;s Coronado Springs Resort.</p>\n<p>\n&#9;Rachel Booth was the winner in the women&#39;s category with a time of 1:17:38.</p>\n',
        //         p_url: "657Re3mS",
        //         is_active: true,
        //         story_metadata: {
        //           id: 510103363,
        //           body: '<p>\n&#9;Five athletes from Newport News completed the Disney&#39;s Princess Half Marathon (Women&#39;s Division) on Feb. 24 in Lake Buena Vista, Fla.</p>\n<p>\n&#9;The runners from Newport News and their finishing times were <span data-scayt_word="Mehgan" data-scaytid="1">Mehgan</span> Flores, 28, 2:26:45; <span data-scayt_word="Charlettia" data-scaytid="2">Charlettia</span> Burch, 40, 2:40:08; Tracey Robbins, 44, 3:36:55; <span data-scayt_word="Calesha" data-scaytid="3">Calesha</span> Hayes, 24, 3:50:01; and Margaret <span data-scayt_word="Vincelette" data-scaytid="4">Vincelette</span>, 39, 4:04:02.</p>\n<p>\n&#9;Race organizers said 21,241 runners finished the 13.1-mile race, which began and ended at Disney&#39;s Coronado Springs Resort.</p>\n<p>\n&#9;Rachel Booth was the winner in the women&#39;s category with a time of 1:17:38.</p>\n',
        //           paid: false,
        //           author: "LocalLabs News Service",
        //           images: [],
        //           teaser:
        //             "Five athletes from Newport News completed the Disney's Princess Half Marathon (Women's Division) on Feb. 24 in Lake Buena Vista, Fla.",
        //           deleted: false,
        //           type_id: 3,
        //           headline:
        //             "5 Newport News runners complete Disney's Princess Half Marathon",
        //           author_id: 1,
        //           published: true,
        //           scheduled: false,
        //           partner_id: null,
        //           story_tags: [],
        //           updated_at: "2016-04-12T00:26:50.000Z",
        //           blacklisted: false,
        //           cms_story_id: 481630,
        //           community_id: 130,
        //           published_at: "2013-03-06T20:12:00Z",
        //           form_datum_id: null,
        //           story_sections: [],
        //           attached_images: [],
        //           story_categories: [],
        //         },
        //         category: [],
        //         analytic: [],
        //       },
        //       {
        //         id: 412591,
        //         community: {
        //           id: 5397,
        //           created: "2023-04-18T11:34:27.662748Z",
        //           modified: "2023-04-18T11:34:27.662775Z",
        //           is_trashed: false,
        //           community_id: 130,
        //           name: "Newport News",
        //           client_company_id: 228,
        //           state: null,
        //           is_active: true,
        //           community_metadata: {
        //             id: 130,
        //             name: "Newport News",
        //             slug: "newport-news-va",
        //             site_url: null,
        //             market_id: 7,
        //             site_name: "",
        //             site_ga_id: null,
        //             updated_at: "2021-12-02T15:47:15.000Z",
        //             site_ga_enabled: true,
        //             client_company_id: 228,
        //           },
        //         },
        //         tag: [],
        //         created: "2023-04-18T11:36:53.656425Z",
        //         modified: "2023-04-18T11:36:53.656430Z",
        //         is_trashed: false,
        //         story_id: 510103364,
        //         title:
        //           "9 Yorktown runners complete Disney's Princess Half Marathon",
        //         lede: "Nine athletes from Yorktown completed the Disney's Princess Half Marathon (Women's Division) on Feb. 24 in Lake Buena Vista, Fla.",
        //         image: null,
        //         word_count: 0,
        //         publication_date: "2013-03-06",
        //         status: "Published",
        //         body: '<p>\n&#9;Nine athletes from Yorktown completed the Disney&#39;s Princess Half Marathon (Women&#39;s Division) on Feb. 24 in Lake Buena Vista, Fla.</p>\n<p>\n&#9;The runners from Yorktown and their finishing times were Alyssa Craig, 20, 2:49:46; Megan <span data-scayt_word="Morsey" data-scaytid="1">Morsey</span>, 35, 2:52:50; Marcy <span data-scayt_word="Singson" data-scaytid="2">Singson</span>, 31, 2:52:51; Alexis Harmon Barbour, 24, 2:57:52; <span data-scayt_word="Brantlee" data-scaytid="3">Brantlee</span> <span data-scayt_word="Lemmink" data-scaytid="4">Lemmink</span>, 42, 3:05:06; Myra <span data-scayt_word="Hinote" data-scaytid="5">Hinote</span>, 42, 3:30:42; Darlene <span data-scayt_word="Pokora" data-scaytid="6">Pokora</span>, 51, 3:37:42; <span data-scayt_word="Charla" data-scaytid="7">Charla</span> <span data-scayt_word="Swale" data-scaytid="8">Swale</span>, 50, 3:45:18; and Elizabeth Mahler Noll, 43, 3:57:47.</p>\n<p>\n&#9;Race organizers said 21,241 runners finished the 13.1-mile race, which began and ended at Disney&#39;s Coronado Springs Resort.</p>\n<p>\n&#9;Rachel Booth was the winner in the women&#39;s category with a time of 1:17:38.</p>\n',
        //         p_url: "4GfnHzQs",
        //         is_active: true,
        //         story_metadata: {
        //           id: 510103364,
        //           body: '<p>\n&#9;Nine athletes from Yorktown completed the Disney&#39;s Princess Half Marathon (Women&#39;s Division) on Feb. 24 in Lake Buena Vista, Fla.</p>\n<p>\n&#9;The runners from Yorktown and their finishing times were Alyssa Craig, 20, 2:49:46; Megan <span data-scayt_word="Morsey" data-scaytid="1">Morsey</span>, 35, 2:52:50; Marcy <span data-scayt_word="Singson" data-scaytid="2">Singson</span>, 31, 2:52:51; Alexis Harmon Barbour, 24, 2:57:52; <span data-scayt_word="Brantlee" data-scaytid="3">Brantlee</span> <span data-scayt_word="Lemmink" data-scaytid="4">Lemmink</span>, 42, 3:05:06; Myra <span data-scayt_word="Hinote" data-scaytid="5">Hinote</span>, 42, 3:30:42; Darlene <span data-scayt_word="Pokora" data-scaytid="6">Pokora</span>, 51, 3:37:42; <span data-scayt_word="Charla" data-scaytid="7">Charla</span> <span data-scayt_word="Swale" data-scaytid="8">Swale</span>, 50, 3:45:18; and Elizabeth Mahler Noll, 43, 3:57:47.</p>\n<p>\n&#9;Race organizers said 21,241 runners finished the 13.1-mile race, which began and ended at Disney&#39;s Coronado Springs Resort.</p>\n<p>\n&#9;Rachel Booth was the winner in the women&#39;s category with a time of 1:17:38.</p>\n',
        //           paid: false,
        //           author: "LocalLabs News Service",
        //           images: [],
        //           teaser:
        //             "Nine athletes from Yorktown completed the Disney's Princess Half Marathon (Women's Division) on Feb. 24 in Lake Buena Vista, Fla.",
        //           deleted: false,
        //           type_id: 3,
        //           headline:
        //             "9 Yorktown runners complete Disney's Princess Half Marathon",
        //           author_id: 1,
        //           published: true,
        //           scheduled: false,
        //           partner_id: null,
        //           story_tags: [],
        //           updated_at: "2016-06-01T03:34:07.000Z",
        //           blacklisted: false,
        //           cms_story_id: 481633,
        //           community_id: 130,
        //           published_at: "2013-03-06T20:15:00Z",
        //           form_datum_id: null,
        //           story_sections: [],
        //           attached_images: [],
        //           story_categories: [],
        //         },
        //         category: [],
        //         analytic: [],
        //       },
        //     ],
        //   },
        // };

        dispatch({
          type: AGENCY_COMPANY_PROJECT_LIST_SUCCESS,
          payload: data?.data?.results,
        });
        dispatch({
          type: AGENCY_COMPANY_PROJECT_LIST,
          payload: data?.data,
        });
        return true;
      } catch (error) {
        dispatch({
          type: AGENCY_COMPANY_PROJECT_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
// Agency company projects list***********

// Agency company projects filters list***********
export const agencyCompanyProjectsFilterListAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_COMPANY_PROJECT_FILTERS_LIST_REQUEST,
      });

      const {
        authReducer: { userData },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await api.get(
        `${BACKEND_API_URL}community/list-community-status-tag-data/`,
        config
      );

      dispatch({
        type: AGENCY_COMPANY_PROJECT_FILTERS_LIST_SUCCESS,
        payload: data?.data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_COMPANY_PROJECT_FILTERS_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
// Agency company projects filters list***********

// Agency company tag list***********
export const agencyCompanyTagsListAction =
  ({ rowsPerPage, page }, filters) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: AGENCY_COMPANY_TAGS_LIST_REQUEST,
        });
        const {
          authReducer: { userData },
        } = getState();

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          params: { ...filters, page_size: rowsPerPage, page },
        };

        const { data } = await api.get(
          `${BACKEND_API_URL}community/tags/`,
          config
        );

        dispatch({
          type: AGENCY_COMPANY_TAGS_LIST_SUCCESS,
          payload: data?.data?.results,
        });
        dispatch({
          type: AGENCY_COMPANY_TAGS_LIST,
          payload: data?.data,
        });
        return true;
      } catch (error) {
        dispatch({
          type: AGENCY_COMPANY_TAGS_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
// Agency company tag list***********

// Agency add company tag list***********
export const agencyAddCompanyTagAction =
  (tagData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_COMPANY_ADD_TAG_REQUEST,
      });

      const {
        authReducer: { userData },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await api.post(
        `${BACKEND_API_URL}community/tags/`,
        tagData,
        config
      );
      dispatch({
        type: AGENCY_COMPANY_ADD_TAG_SUCCESS,
        payload: data?.message,
      });
      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_COMPANY_ADD_TAG_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
// Agency add company tag list***********

// Agency community settings list***********
export const agencyCommunitySettingsListAction =
  ({ rowsPerPage, page }, filters) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: AGENCY_COMMUNITY_SETTINGS_LIST_REQUEST,
        });

        const {
          authReducer: { userData },
        } = getState();

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          params: { ...filters, page_size: rowsPerPage, page },
        };

        const { data } = await api.get(
          `${BACKEND_API_URL}community/community-setting/`,
          config
        );

        dispatch({
          type: AGENCY_COMMUNITY_SETTINGS_LIST_SUCCESS,
          payload: data?.data,
        });
        return true;
      } catch (error) {
        dispatch({
          type: AGENCY_COMMUNITY_SETTINGS_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
// Agency community settings list***********

// Agency audiences list***********
export const agencyAudiencesListAction =
  ({ rowsPerPage, page }, filters) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: AGENCY_AUDIENCES_LIST_REQUEST,
        });

        const {
          authReducer: { userData },
        } = getState();

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          params: { ...filters, page_size: rowsPerPage, page },
        };

        const { data } = await api.get(
          `${BACKEND_API_URL}agency/audience/`,
          config
        );

        dispatch({
          type: AGENCY_AUDIENCES_LIST_SUCCESS,
          payload: data?.data,
        });
        return true;
      } catch (error) {
        dispatch({
          type: AGENCY_AUDIENCES_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
// Agency audiences list***********

// Agency Company story details action  ***********
export const agencyCompanyStoryDetailsAction =
  (communityId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_COMPANY_STORY_DETAILS_SUCCESS,
        payload: true,
      });
      const {
        authReducer: { userData },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data, status } = await api.get(
        `${BACKEND_API_URL}community/stories/${communityId}/`,
        config
      );
      if (status === 200) {
        dispatch({
          type: AGENCY_COMPANY_STORY_DETAILS_SUCCESS,
          payload: false,
        });
        dispatch({
          type: AGENCY_COMPANY_STORY_DETAILS_SUCCESS,
          payload: data?.data,
        });
      }
      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_COMPANY_STORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
// Agency Company story details action  ***********
