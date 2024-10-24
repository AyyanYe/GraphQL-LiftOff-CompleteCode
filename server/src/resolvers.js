const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: async (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  
  Mutation: {
    incrementTrackViews: async (_, { trackId }, { dataSources }) => {
      try {
        const updatedTrack = await dataSources.trackAPI.incrementTrackViews(trackId);
        return {
          code: 200,
          success: true,
          message: 'Track views incremented successfully',
          track: updatedTrack,
        }
      } catch (e) {
        return {
          code: e.extensions.response.status,
          success: false,
          message: e.extensions.response.body,
          track: null,
        }
      }
    },
  },

  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
