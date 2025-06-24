import Icon from "@/components/ui/icon";

const SafetyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="bg-white rounded-full p-3">
          <Icon name="Shield" size={32} className="text-green-500" />
        </div>

        <div className="flex-1">
          <h2 className="text-white text-xl font-bold mb-2 font-rubik">
            🛡️ Безопасный просмотр
          </h2>
          <p className="text-white/90 text-sm">
            Все видео проверены модераторами. Помни: не делись личной
            информацией и всегда спрашивай у взрослых, если что-то непонятно!
          </p>
        </div>

        <div className="hidden sm:block">
          <div className="text-6xl">🌟</div>
        </div>
      </div>
    </div>
  );
};

export default SafetyBanner;
