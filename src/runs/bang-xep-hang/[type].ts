import { pathIsHome } from "raiku-pgs/plugin"
import type { LocationQuery } from "vue-router"

import { CURL } from "../../const"
import Parse from "../../parsers/[general]"

export default async function (
  slug: string,
  page: number,
  query: LocationQuery
) {
  const { data, url } = await get({
    url: `${CURL}/${slug.replace(
      ".html",
      ""
    )}/trang-${page}.html?${new URLSearchParams(
      query as Record<string, string>
    )}`
  })

  if (pathIsHome(url)) throw new Error("not_found")

  return Parse(data, Date.now())
}