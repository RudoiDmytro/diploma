import { Metadata, ResolvingMetadata } from "next";
import { getIntl } from "../../lib/intl";

type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  props: RouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);

  return {
    title: intl.formatMessage({ id: "page.home.head.title" }),
    description: intl.formatMessage({
      id: "page.home.head.meta.description",
    }),
    alternates: {
      canonical: "https://example.com",
      languages: {
        uk: "http://example.com",
        en: "http://example.com/en",
        "x-default": "http://example.com",
      },
    },
  };
}

type HomeProps = {
  params: { locale: string };
};

export default async function Home({ params: { locale } }: HomeProps) {
  const intl = await getIntl(locale);

  return (
    <main>
      <h1>{intl.formatMessage({ id: "page.home.title" })}</h1>
      <p>{intl.formatMessage({ id: "page.home.description" })}</p>
    </main>
  );
}
