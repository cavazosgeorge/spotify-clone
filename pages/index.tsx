import GradientLayout from "../components/gradientLayout";

const Home = () => {
  return (
    <GradientLayout
      roundImage
      color="purple"
      subtitle="profile"
      title="George Cavazos"
      description="15 public playlists"
      image="https://avatars.githubusercontent.com/u/65411983?v=4"
    >
      <div>Home Page</div>
    </GradientLayout>
  );
};

export default Home;
