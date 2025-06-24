import Icon from "@/components/ui/icon";

const GameElements = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-white text-2xl font-bold mb-2 font-rubik">
          🏆 Твои достижения
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Звездочки активности */}
        <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-white font-bold text-lg">127</div>
          <div className="text-white/80 text-sm">Звездочек</div>
        </div>

        {/* Просмотренные видео */}
        <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🎬</div>
          <div className="text-white font-bold text-lg">23</div>
          <div className="text-white/80 text-sm">Видео просмотрено</div>
        </div>

        {/* Значки достижений */}
        <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🎖️</div>
          <div className="text-white font-bold text-lg">5</div>
          <div className="text-white/80 text-sm">Значков получено</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors">
          🎁 Получить награду
        </button>
      </div>
    </div>
  );
};

export default GameElements;
