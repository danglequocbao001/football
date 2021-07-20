import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/api/app/auth/login',
    SIGNUP: `/api/app/auth/signup`,
    TYPE_OF_USER: `/api/app/auth/users/profile`,
    RESET_PASSWORD_EMAIL: `/api/app/reset_password/send_code`,
    CHECK_CODE_RESET: `/api/app/reset_password/check_code`,
    RESET_PASSWORD: `/api/app/app_users/change_password`,
    RESET_PASSWORD_NEW: `/api/app/reset_password/reset_password`,
    COUNTRY_CODE: `/api/app/country_codes`,
    UPDATE_AVATAR: `/api/app/app_users/update_avatar`
  },
  ACCOUNT: {
    PROFILE_USER: `/api/app/users/profile`,
    UPDATE_PROFILE: `/app/app_users/update_profile`,
    UPDATE_PASS: `/app/users/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/request_upgrade`,
    CONTACT_ADMIN: `/app/interact_email/submit`
  },
  DEVICES: {
    GET: `/api/app/devices`,
    CHECK: (id) => `/api/app/devices/exists/?device_key=${id}`,
    GENERATE: `/api/app/generate_key`
  },
  COMPETITIONS: {
    GET: `/api/app/competitions/all`,
    SUB: `api/app/subscribe_sources/subscribe`,
    UNSUB: `api/app/subscribe_sources/unsubscribe`,
    GET_TEAM: `api/app/teams`,
    ALL_WITH_SUBSCRIBE: `/api/app/competitions/national_teams`,
    INTERNATION: `/api/app/competitions/international_club`,
    SEARCH: `/api/app/search`
  },
  COUNTRY: {
    GET: `/api/app/competitions/countries`
  },
  SCORE: {
    GET_MINE: `/api/app/v1/scores_lives/mine`,
    GET_ALL:  `/api/app/v1/scores_lives/all`
  },
  MYTEAM: {
    GET_MATCH_DETAIL: `/api/app/insights/outstanding`,
    GET_LIST_MATCH: `/api/app/scores_lives/mine`,
    GET_LIST_LIVE: `/api/app/scores_lives/live`,
    GET_RANK: `/api/app/standings`,
    GET_PLAYER: `/api/app/players`,
    GET_NEWS_MATCH: `/api/app/news/match`
  },
  FAVORITE: {
    GET_TEAM: `/api/app/v1/favorites/teams`,
    GET_LEAGUE: `/api/app/v1/favorites/competitions`,
    GET_PLAYER: `/api/app/v1/favorites/players`,
    NOTI: `/api/app/favorites/notification`,
    NOTI_ALL: `/api/app/favorites/notification_all`,
    SUGGESTION_TEAM: `/api/app/suggestions/teams`,
    SUGGESTION_LEAGUE: `/api/app/suggestions/competitions`,
    SUGGETION_PLAYER: `/api/app/suggestions/players`
  },
  NEWS: {
    GET: `/api/app/news/featured`,
    GET_TRANSFER: `/api/app/news/transfer`,
    GET_ID: (id) => `/api/app/news/${id}`,
    ACTION: `/api/app/news/take_action`,
    ACTION_CANCEL: `/api/app/news/cancel_action`,
    GET_ORTHER: `/api/app/news/other`,
    GET_ACTIVE: `/api/app/options`,
    GET_FOOTER_NEWS: `/api/app/switches/news_footer`,
    // get active news at score page
    GET_ACTIVE_NEWS: `/api/app/news/active`
  },
  SETTING: {
    GET_SUPPORTS: `/api/app/supports`,
    SET_NOTE: `/api/app/feedbacks`,
    LIVE_STREAM: `/api/app/live_streams`,
    LIVE_STREAM_IOS: `/api/app/live_streams/ios`
  },
  MINIGAME: {
    GET: `/api/app/mini_games`,
    GET_IOS: `/api/app/mini_games/ios`,

  },
  BANNER: {
    GET: `api/app/v1/banners`,
    CHECK_BANNER_IOS: `/api/app/switches/ios_banners`,
    GET_BANNER_IOS: `api/app/v1/banners/ios`
  },
  FACEBOOK:{
    POST: `/api/app/auth/login_with_facebook`
  }
}

