const Movie = require("./models/Movies");

const resolvers = {
  Query: {
    getAllMovies: async () => {
      try {
        return await Movie.find();
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
        throw new Error("Failed to fetch movies");
      }
    },

    getMovieById: async (_, { id }) => {
      try {
        const movie = await Movie.findById(id);
        if (!movie) throw new Error("Movie not found");
        return movie;
      } catch (error) {
        console.error("❌ Error fetching movie:", error);
        throw new Error("Invalid Movie ID or Movie not found");
      }
    }
  },

  Mutation: {
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        if (!name || !director_name || !production_house || !release_date || rating == null) {
          throw new Error("All fields are required");
        }

        const newMovie = new Movie({ name, director_name, production_house, release_date, rating });
        await newMovie.save();
        return newMovie;
      } catch (error) {
        console.error("❌ Error adding movie:", error);
        throw new Error("Failed to add movie");
      }
    },

    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          id,
          { name, director_name, production_house, release_date, rating },
          { new: true, runValidators: true } // Ensures updated fields are validated
        );

        if (!updatedMovie) throw new Error("Movie not found");
        return updatedMovie;
      } catch (error) {
        console.error("❌ Error updating movie:", error);
        throw new Error("Failed to update movie. Check the ID or fields.");
      }
    },

    deleteMovie: async (_, { id }) => {
      try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) throw new Error("Movie not found");
        return `✅ Movie with ID ${id} deleted successfully`;
      } catch (error) {
        console.error("❌ Error deleting movie:", error);
        throw new Error("Failed to delete movie. Check the ID.");
      }
    }
  }
};

module.exports = resolvers;
