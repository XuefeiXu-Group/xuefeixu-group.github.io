import { members } from "./data.js";
import { newsItems } from "./news.js";

export const pageTitles = {
  "/": "Xuefei Xu's Group | Tsinghua University",
  "/members": "People",
  "/research": "Research",
  "/publications": "Publications",
  "/news": "News",
  "/software": "Software",
  "/links": "Resources",
  "/contact": "Contact",
};

export const allMembers = [
  ...members.pi, ...members.postdocs, ...members.graduate, ...members.undergraduate,
  ...members.alumni.postdocs, ...members.alumni.phd, ...members.alumni.visiting,
];

export function memberSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const staticPaths = new Set([
  ...Object.keys(pageTitles).filter(path => path !== "/"),
  "/teaching",
  "/tutorials",
  ...allMembers.map(person => `/members/${memberSlug(person.name)}`),
  ...newsItems.map(story => `/news/${story.id}`),
]);
