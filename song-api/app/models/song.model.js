module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      artist: String,
      album: String,
      track: String,
      year: String,
      img_src: String,
      src: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Song = mongoose.model("song", schema);
  return Song;
};
