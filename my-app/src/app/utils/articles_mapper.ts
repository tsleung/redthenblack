import * as ROUTES from './route_mapper';


export interface Article {
  href: string;
}

interface Library {
  articles: Article[];
}
export const ABOUT_RTB = {
  href: ROUTES.createAboutRoute()
};

export const MILLIONAIRE_ARTICLE = {
  href: ROUTES.createMillionaireArticleRoute()
};