import Prismic from "@prismicio/client";
import PortfoliosGrid from "../../../components/PortfoliosGrid";
import { Client } from "../../../prismic";

export default function DivisionPage(props) {
  return <PortfoliosGrid items={props.items} />;
}

export async function getStaticProps(context) {
  const data = await Client().query(
    [
      Prismic.Predicates.at("document.type", "portfolio"),
      Prismic.Predicates.fulltext(
        "my.portfolio.division",
        context.params.division
      ),
    ],
    {
      orderings: "[my.portfolio.name]",
      pageSize: 100,
    }
  );

  const portfoliosWithElairoAlbums = await Promise.all(
    data.results.map(async (portfolio) => {
      const sharingId = portfolio.data.elairo_album_sharing_id;
      const res = await fetch(`https://www.example.com`);
      const data = await res.json();
      return {
        portfolio: portfolio,
        elairoAlbum: data,
      };
    })
  );

  return {
    props: {
      items: portfoliosWithElairoAlbums,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { division: "fashion-men" } },
      { params: { division: "fashion-women" } },
      { params: { division: "children" } },
      { params: { division: "commercial" } },
      { params: { division: "talent-lifestyle" } },
      { params: { division: "new-faces" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}
