import Icon from "@/components/ui/icon";

interface VideoCardProps {
  title: string;
  author: string;
  views: string;
  thumbnail: string;
  duration: string;
  isLiked?: boolean;
}

const VideoCard = ({
  title,
  author,
  views,
  thumbnail,
  duration,
  isLiked = false,
}: VideoCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-medium">
          {duration}
        </div>
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          ✓ БЕЗОПАСНО
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 font-rubik">
          {title}
        </h3>

        <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
          <span className="font-medium">{author}</span>
          <span>{views} просмотров</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
                isLiked
                  ? "bg-red-100 text-red-500"
                  : "bg-gray-100 hover:bg-red-100 hover:text-red-500"
              }`}
            >
              <Icon name="Heart" size={16} />
              <span className="text-sm font-medium">Нравится</span>
            </button>
          </div>

          <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors font-medium text-sm">
            Смотреть
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
