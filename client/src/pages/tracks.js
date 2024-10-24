import React from "react";
import { Layout, QueryResult } from "../components";
import { useQuery, gql } from "@apollo/client";
import TrackCard from "../containers/track-card";

const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );

  // return (
  //   <Layout grid>
  //     {data?.tracksFromHome?.map((track) => {
  //       <TrackCard key={track.id} track={track} />;
  //     })}
  //   </Layout>
  // );
};

export default Tracks;
