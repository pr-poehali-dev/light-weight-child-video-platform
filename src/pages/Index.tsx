import Navigation from "@/components/Navigation";
import VideoCard from "@/components/VideoCard";
import SafetyBanner from "@/components/SafetyBanner";
import GameElements from "@/components/GameElements";

const Index = () => {
  const popularVideos = [
    {
      title: "🎨 Как нарисовать радугу - простой урок для детей",
      author: "Творческие мастер-классы",
      views: "1.2К",
      thumbnail:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      duration: "5:30",
    },
    {
      title: "🐸 Забавные истории о лягушонке - мультфильм",
      author: "Детские сказки",
      views: "3.5К",
      thumbnail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fae?w=400&h=300&fit=crop",
      duration: "12:15",
    },
    {
      title: "🚀 Космические приключения - развивающий мультик",
      author: "Мир науки для детей",
      views: "2.1К",
      thumbnail:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      duration: "8:45",
    },
    {
      title: "🎵 Веселые песенки про животных",
      author: "Детские песни",
      views: "4.7К",
      thumbnail:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop",
      duration: "15:20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <SafetyBanner />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-rubik">
              🔥 Популярные видео
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularVideos.map((video, index) => (
                <VideoCard
                  key={index}
                  title={video.title}
                  author={video.author}
                  views={video.views}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  isLiked={index === 1}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <GameElements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
